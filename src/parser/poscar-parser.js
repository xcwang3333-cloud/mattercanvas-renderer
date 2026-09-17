// MatterCanvas Renderer v0.4
// Robust VASP POSCAR / CONTCAR parser used by the DFT figure pipeline.

import { StructureModel } from '../core/structure-model.js';

function numbers(line) {
  return line.trim().split(/[\s,]+/).map(Number).filter(Number.isFinite);
}

function determinant([a, b, c]) {
  return (
    a[0] * (b[1] * c[2] - b[2] * c[1]) -
    a[1] * (b[0] * c[2] - b[2] * c[0]) +
    a[2] * (b[0] * c[1] - b[1] * c[0])
  );
}

function scaleVector(v, scale) {
  return [v[0] * scale, v[1] * scale, v[2] * scale];
}

function fracToCart(frac, lattice) {
  const [a, b, c] = lattice;
  return [
    frac[0] * a[0] + frac[1] * b[0] + frac[2] * c[0],
    frac[0] * a[1] + frac[1] * b[1] + frac[2] * c[1],
    frac[0] * a[2] + frac[1] * b[2] + frac[2] * c[2]
  ];
}

function isCountLine(tokens) {
  return tokens.length > 0 && tokens.every(token => {
    const n = Number(token);
    return Number.isInteger(n) && n >= 0;
  });
}

export function parsePOSCAR(text, sourceName = 'POSCAR') {
  const lines = text.split(/\r?\n/).map(line => line.trim());
  let cursor = 0;
  while (cursor < lines.length && !lines[cursor]) cursor += 1;

  const title = lines[cursor++] || sourceName;
  const scaleValue = Number(lines[cursor++]);
  if (!Number.isFinite(scaleValue) || scaleValue === 0) {
    throw new Error('POSCAR scale must be a non-zero number.');
  }

  const rawLattice = [0, 1, 2].map(() => {
    const v = numbers(lines[cursor++] || '');
    if (v.length < 3) throw new Error('POSCAR lattice vector must contain three numbers.');
    return v.slice(0, 3);
  });

  const rawVolume = Math.abs(determinant(rawLattice));
  const scale = scaleValue < 0
    ? Math.cbrt(Math.abs(scaleValue) / Math.max(rawVolume, 1e-12))
    : scaleValue;
  const lattice = rawLattice.map(v => scaleVector(v, scale));

  const speciesOrCounts = (lines[cursor++] || '').split(/[\s,]+/).filter(Boolean);
  if (!speciesOrCounts.length) throw new Error('POSCAR species/count line is missing.');

  let elements;
  let counts;
  if (isCountLine(speciesOrCounts)) {
    // VASP 4 style: element names are not encoded in the file.
    counts = speciesOrCounts.map(Number);
    elements = counts.map((_count, index) => `X${index + 1}`);
  } else {
    elements = speciesOrCounts;
    const countTokens = (lines[cursor++] || '').split(/[\s,]+/).filter(Boolean);
    if (!isCountLine(countTokens)) throw new Error('POSCAR atom counts are invalid.');
    counts = countTokens.map(Number);
  }

  if (elements.length !== counts.length) {
    throw new Error('POSCAR species and atom-count columns have different lengths.');
  }

  let selectiveDynamics = false;
  if (/^s/i.test(lines[cursor] || '')) {
    selectiveDynamics = true;
    cursor += 1;
  }

  const mode = (lines[cursor++] || 'Direct').toLowerCase();
  const direct = mode.startsWith('d');
  const cartesian = mode.startsWith('c') || mode.startsWith('k');
  if (!direct && !cartesian) throw new Error('POSCAR coordinate mode must be Direct or Cartesian.');

  const structure = new StructureModel({ lattice });
  structure.title = title;
  structure.sourceName = sourceName;
  structure.selectiveDynamics = selectiveDynamics;

  let atomIndex = 0;
  counts.forEach((count, speciesIndex) => {
    for (let localIndex = 0; localIndex < count; localIndex += 1) {
      while (cursor < lines.length && !lines[cursor]) cursor += 1;
      const fields = (lines[cursor++] || '').split(/[\s,]+/).filter(Boolean);
      const coords = fields.slice(0, 3).map(Number);
      if (coords.length < 3 || coords.some(v => !Number.isFinite(v))) {
        throw new Error(`POSCAR atom ${atomIndex + 1} has invalid coordinates.`);
      }

      const position = direct
        ? fracToCart(coords, lattice)
        : scaleVector(coords, scale);

      structure.addAtom(elements[speciesIndex], position, atomIndex);
      structure.atoms[structure.atoms.length - 1].selective = selectiveDynamics ? fields.slice(3, 6) : [];
      atomIndex += 1;
    }
  });

  structure.coordinateType = direct ? 'direct(converted)' : 'cartesian';
  structure.elements = elements.map((element, index) => ({ element, count: counts[index] }));
  return structure;
}

export function parseVaspStructure(text, sourceName = 'POSCAR') {
  return parsePOSCAR(text, sourceName);
}
