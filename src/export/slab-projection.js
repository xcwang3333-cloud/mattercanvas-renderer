// MatterCanvas Renderer v0.4-7
// Slab-aware projection utilities.

import { detectSlab } from '../analysis/slab-detector.js';

export function getProjectionPoints(structure, options = {}) {
  const atoms = structure?.atoms || [];
  const slab = detectSlab(structure, options);

  const points = atoms.map(a => a.position);

  if (!slab.isSlab || options.useCellBounds) {
    return {
      points,
      slab
    };
  }

  // For slab systems, fit the atomic layer instead of the vacuum-expanded cell.
  const xs = points.map(p => p[0]);
  const ys = points.map(p => p[1]);
  const zs = points.map(p => p[2]);

  const center = [
    (Math.min(...xs) + Math.max(...xs)) / 2,
    (Math.min(...ys) + Math.max(...ys)) / 2,
    (Math.min(...zs) + Math.max(...zs)) / 2
  ];

  return {
    points,
    center,
    slab,
    mode: 'atomic-layer-fit'
  };
}
