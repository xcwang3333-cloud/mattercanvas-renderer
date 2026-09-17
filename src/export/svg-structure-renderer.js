// MatterCanvas Renderer v0.4
// Publication SVG structure renderer with active-site and coordination highlighting.

import { detectBonds } from '../core/bond-detector.js';
import { getElement } from '../core/elements.js';
import { svgCircle, svgLine } from './vector-primitives.js';
import { createOrthographicProjector } from './projection.js';
import { latticeVertices, renderSvgCell } from './svg-cell-renderer.js';
import { getAtomRenderStyle } from '../renderers/svg-active-site-style.js';
import { buildActiveSiteState } from '../renderers/active-site-highlight.js';
import { buildCoordinationAnnotations } from '../renderers/coordination-annotation.js';
import { renderSvgCoordination } from './svg-coordination-renderer.js';

function hexColor(value) {
  if (typeof value === 'string') return value;
  return `#${Number(value || 0xaaaaaa).toString(16).padStart(6, '0').slice(-6)}`;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function renderStructureSVG(structure, options = {}) {
  if (!structure?.atoms?.length) return '';

  const width = options.width || 400;
  const height = options.height || 360;
  const style = options.style || {};
  const showCell = options.showCell ?? true;

  const points = [
    ...structure.atoms.map(a => a.position),
    ...(showCell ? latticeVertices(structure.lattice) : [])
  ];

  const projector = createOrthographicProjector(points, {
    width,
    height,
    padding: options.padding ?? 34,
    ...(options.camera || {})
  });

  const highlightState = options.highlight
    ? buildActiveSiteState(structure, options.highlight)
    : null;

  const bonds = options.bonds || detectBonds(structure.atoms);

  const cellSvg = showCell
    ? renderSvgCell(structure.lattice, projector, style)
    : '';

  const coordinationSvg = options.coordination
    ? renderSvgCoordination(
        buildCoordinationAnnotations(structure, options.coordination),
        structure,
        projector,
        style
      )
    : '';

  const bondSvg = bonds.map(bond => {
    const a = projector(structure.atoms[bond.atom1].position);
    const b = projector(structure.atoms[bond.atom2].position);
    return svgLine(a.x, a.y, b.x, b.y, {
      stroke: style.bondColor || '#666b70',
      width: style.bondWidth ?? 2,
      opacity: style.bondOpacity ?? 0.9
    });
  }).join('\n');

  const atomSvg = structure.atoms.map((atom, index) => {
    const p = projector(atom.position);
    const element = getElement(atom.element);
    const renderStyle = getAtomRenderStyle(atom, index, highlightState);

    const radius = clamp(
      element.radius * (style.atomRadiusScale ?? 8.6) * renderStyle.scale,
      3,
      18
    );

    return svgCircle(p.x, p.y, radius, {
      fill: hexColor(element.color),
      opacity: renderStyle.opacity,
      stroke: renderStyle.stroke || '#ffffff',
      width: renderStyle.strokeWidth || 0.65
    });
  }).join('\n');

  return `<g class="mc-structure">\n${cellSvg}\n${coordinationSvg}\n${bondSvg}\n${atomSvg}\n</g>`;
}
