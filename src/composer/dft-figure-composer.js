// MatterCanvas Renderer v0.4
// Compose multiple VASP structures into a reproducible publication-ready SVG figure.

import { composeFigure } from './figure-composer.js';
import { panelLabel } from './panel-label.js';
import { renderStructureSVG } from '../export/svg-structure-renderer.js';
import { svgRect, svgText } from '../export/vector-primitives.js';
import { getPublicationPreset } from '../renderer/publication-presets.js';

export function renderDftFigureSvg(panels, options = {}) {
  if (!panels?.length) throw new Error('At least one DFT structure panel is required.');

  const style = getPublicationPreset(options.style || 'nature');
  const panelWidth = options.panelWidth || 390;
  const panelHeight = options.panelHeight || 350;
  const gap = options.gap ?? 18;
  const columns = options.columns || 2;
  const layout = composeFigure(panels, { columns, gap, panelWidth, panelHeight });
  const background = options.background || style.background || '#ffffff';
  const structureHeight = panelHeight - 48;

  const panelGroups = layout.panels.map((panel, index) => {
    const label = panel.label || panelLabel(index);
    const title = panel.title || panel.sourceLabel || `Structure ${index + 1}`;
    const structureSvg = renderStructureSVG(panel.structure, {
      width: panelWidth,
      height: structureHeight,
      style,
      camera: options.camera,
      showCell: options.showCell ?? true,
      padding: options.padding ?? 34,
      maxBondDistance: options.maxBondDistance
    });

    return `<g class="mc-panel" transform="translate(${panel.x} ${panel.y})">
      ${svgRect(0, 0, panelWidth, panelHeight, { fill: background })}
      ${svgText(14, 24, label, { size: style.panelLabelSize || 18, weight: 700, fill: '#111111' })}
      <g transform="translate(0 28)">${structureSvg}</g>
      ${svgText(panelWidth / 2, panelHeight - 10, title, {
        size: style.panelTitleSize || 14,
        weight: 500,
        fill: '#222222',
        anchor: 'middle'
      })}
    </g>`;
  }).join('\n');

  const metadata = {
    generator: 'MatterCanvas Renderer',
    version: 'v0.4-6',
    style: style.name,
    columns,
    panelCount: panels.length
  };

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${layout.width}" height="${layout.height}" viewBox="0 0 ${layout.width} ${layout.height}">
    <metadata>${JSON.stringify(metadata)}</metadata>
    ${svgRect(0, 0, layout.width, layout.height, { fill: background })}
    ${panelGroups}
  </svg>`;
}

export function downloadSvg(svgString, filename = 'mattercanvas-dft-figure.svg') {
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
