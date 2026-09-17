// Vector primitives for publication SVG export

export function svgLine(x1, y1, x2, y2, style = {}) {
  const stroke = style.stroke || '#333333';
  const width = style.width || 1;
  const opacity = style.opacity ?? 1;
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${width}" opacity="${opacity}" />`;
}

export function svgCircle(cx, cy, r, style = {}) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${style.fill || '#888888'}" />`;
}

export function svgText(x, y, text, style = {}) {
  return `<text x="${x}" y="${y}" font-size="${style.size || 14}" font-family="Arial">${text}</text>`;
}
