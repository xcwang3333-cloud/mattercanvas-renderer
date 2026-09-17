// PDF export adapter
// SVG is kept as the primary editable format.

export function exportPDF(svgString, options = {}) {
  return {
    format: 'pdf',
    source: 'svg',
    width: options.width || 210,
    height: options.height || 210,
    svg: svgString
  };
}
