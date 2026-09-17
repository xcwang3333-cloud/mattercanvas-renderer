// Minimal POSCAR parser for MatterCanvas Renderer v0.1

import { StructureModel } from '../core/structure-model.js';

export function parsePOSCAR(text) {
  const lines = text.trim().split(/\r?\n/);
  const scale = Number(lines[1].trim());

  const lattice = lines.slice(2, 5).map(line =>
    line.trim().split(/\s+/).map(Number).map(v => v * scale)
  );

  const elements = lines[5].trim().split(/\s+/);
  const counts = lines[6].trim().split(/\s+/).map(Number);

  let start = 7;
  if (lines[start].toLowerCase().startsWith('selective')) start++;

  const direct = lines[start].toLowerCase().startsWith('direct');
  start++;

  const structure = new StructureModel({ lattice });

  let index = 0;
  counts.forEach((count, i) => {
    for (let j = 0; j < count; j++) {
      const pos = lines[start + index].trim().split(/\s+/).slice(0,3).map(Number);
      structure.addAtom(elements[i], pos, index);
      index++;
    }
  });

  structure.coordinateType = direct ? 'fractional' : 'cartesian';
  return structure;
}
