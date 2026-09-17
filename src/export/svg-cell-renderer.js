// MatterCanvas Renderer v0.4
// Vector unit-cell renderer for publication SVG output.

import { svgLine } from './vector-primitives.js';

function add(a, b) {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

export function latticeVertices(lattice) {
  if (!lattice || lattice.length !== 3) return [];
  const [a, b, c] = lattice;
  const origin = [0, 0, 0];
  const ab = add(a, b);
  const ac = add(a, c);
  const bc = add(b, c);
  const abc = add(ab, c);
  return [origin, a, b, c, ab, ac, bc, abc];
}

const CELL_EDGES = [
  [0, 1], [0, 2], [0, 3],
  [1, 4], [1, 5],
  [2, 4], [2, 6],
  [3, 5], [3, 6],
  [4, 7], [5, 7], [6, 7]
];

export function renderSvgCell(lattice, projector, style = {}) {
  const vertices = latticeVertices(lattice);
  if (!vertices.length) return '';
  const projected = vertices.map(projector);

  return CELL_EDGES.map(([i, j]) => svgLine(
    projected[i].x,
    projected[i].y,
    projected[j].x,
    projected[j].y,
    {
      stroke: style.cellColor || '#70808a',
      width: style.cellWidth ?? 1,
      opacity: style.cellOpacity ?? 0.22,
      dash: style.cellDash || undefined,
      linecap: 'round'
    }
  )).join('\n');
}

export { CELL_EDGES };
