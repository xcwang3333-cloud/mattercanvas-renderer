// MatterCanvas Renderer v0.4
// Covalent-radius based bond detection using the shared scientific element library.

import { getElement } from './elements.js';

function distance(a, b) {
  return Math.hypot(
    a[0] - b[0],
    a[1] - b[1],
    a[2] - b[2]
  );
}

export function detectBonds(atoms, tolerance = 1.18, options = {}) {
  const bonds = [];
  const minDistance = options.minDistance ?? 0.35;
  const maxDistance = options.maxDistance ?? Infinity;

  for (let i = 0; i < atoms.length; i += 1) {
    for (let j = i + 1; j < atoms.length; j += 1) {
      const ri = getElement(atoms[i].element).radius;
      const rj = getElement(atoms[j].element).radius;
      const d = distance(atoms[i].position, atoms[j].position);
      const cutoff = tolerance * (ri + rj);

      if (d >= minDistance && d <= Math.min(cutoff, maxDistance)) {
        bonds.push({ atom1: i, atom2: j, distance: d });
      }
    }
  }

  return bonds;
}
