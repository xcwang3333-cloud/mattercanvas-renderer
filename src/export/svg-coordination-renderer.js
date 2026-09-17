// MatterCanvas Renderer v0.4-8
// SVG coordination annotation renderer for publication figures.

import { svgLine, svgText } from './vector-primitives.js';

function midpoint(a, b) {
  return {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2
  };
}

export function renderSvgCoordinationAnnotations(
  annotations = [],
  atoms = [],
  projector,
  options = {}
) {
  if (!projector || !annotations.length) return '';

  const lineColor = options.lineColor || '#8a8f94';
  const lineWidth = options.lineWidth ?? 1.2;
  const opacity = options.opacity ?? 0.65;
  const labelSize = options.labelSize ?? 11;

  return annotations.map(item => {
    const atom1 = atoms[item.atom1];
    const atom2 = atoms[item.atom2];
    if (!atom1 || !atom2) return '';

    const p1 = projector(atom1.position);
    const p2 = projector(atom2.position);
    const mid = midpoint(p1, p2);

    return [
      svgLine(p1.x, p1.y, p2.x, p2.y, {
        stroke: lineColor,
        width: lineWidth,
        opacity,
        dasharray: '5 4'
      }),
      svgText(mid.x, mid.y - 4, item.label || `${item.distance.toFixed(2)} Å`, {
        size: labelSize,
        fill: options.textColor || '#555555',
        family: 'Arial'
      })
    ].join('\n');
  }).join('\n');
}
