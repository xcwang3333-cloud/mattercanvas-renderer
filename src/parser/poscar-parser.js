// MatterCanvas Renderer v0.1
// POSCAR parser with Direct -> Cartesian conversion

import { StructureModel } from '../core/structure-model.js';

function fracToCart(frac, lattice) {
  const [a, b, c] = lattice;
  return [
    frac[0] * a[0] + frac[1] * b[0] + frac[2] * c[0],
    frac[0] * a[1] + frac[1] * b[1] + frac[2] * c[1],
    frac[0] * a[2] + frac[1] * b[2] + frac[2] * c[2]
  ];
}

export function parsePOSCAR(text) {
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  const scale = Number(lines[1].trim());

  const lattice = lines.slice(2, 5).map(line =>
    line.trim().split(/\s+/).map(Number).map(v => v * scale)
  );

  const elements = lines[5].trim().split(/\s+/);
  const counts = lines[6].trim().split(/\s+/).map(Number);

  let start = 7;
  if (lines[start]?.toLowerCase().startsWith('selective')) start++;

  const direct = lines[start].toLowerCase().startsWith('direct');
  start++;

  const structure = new StructureModel({ lattice });

  let index = 0;
  counts.forEach((count, i) => {
    for (let j = 0; j < count; j++) {
      let pos = lines[start + index]
        .trim()
        .split(/\s+/)
        .slice(0, 3)
        .map(Number);

      if (direct) {
        pos = fracToCart(pos, lattice);
      }

      structure.addAtom(elements[i], pos, index);
      index++;
    }
  });

  structure.coordinateType = direct ? 'cartesian(converted)' : 'cartesian';
  return structure;
}
