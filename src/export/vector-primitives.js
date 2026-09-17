// MatterCanvas Renderer v0.4
// Small, dependency-free SVG primitives for publication export.

function attrs(style = {}) {
  return Object.entries(style)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${key}="${String(value).replace(/"/g, '&quot;')}"`)
    .join(' ');
}

export function svgLine(x1, y1, x2, y2, style = {}) {
  const normalized = typeof style === 'string' ? { stroke: style } : style;
  const lineStyle = {
    stroke: normalized.stroke || '#333333',
    'stroke-width': normalized.width ?? normalized['stroke-width'] ?? 1,
    opacity: normalized.opacity ?? 1,
    'stroke-linecap': normalized.linecap || 'round',
    'stroke-dasharray': normalized.dash || undefined
  };
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${attrs(lineStyle)} />`;
}

export function svgCircle(cx, cy, r, style = {}) {
  const normalized = typeof style === 'string' ? { fill: style } : style;
  const circleStyle = {
    fill: normalized.fill || '#888888',
    stroke: normalized.stroke || undefined,
    'stroke-width': normalized.width ?? undefined,
    opacity: normalized.opacity ?? 1
  };
  return `<circle cx="${cx}" cy="${cy}" r="${r}" ${attrs(circleStyle)} />`;
}

export function svgText(x, y, text, style = {}) {
  const textStyle = {
    'font-size': style.size || 14,
    'font-family': style.family || 'Arial, Helvetica, sans-serif',
    'font-weight': style.weight || 400,
    fill: style.fill || '#111111',
    'text-anchor': style.anchor || 'start',
    'dominant-baseline': style.baseline || 'alphabetic',
    opacity: style.opacity ?? 1
  };
  const safeText = String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `<text x="${x}" y="${y}" ${attrs(textStyle)}>${safeText}</text>`;
}

export function svgRect(x, y, width, height, style = {}) {
  return `<rect x="${x}" y="${y}" width="${width}" height="${height}" ${attrs({
    fill: style.fill || 'none',
    stroke: style.stroke || undefined,
    'stroke-width': style.width ?? undefined,
    opacity: style.opacity ?? 1,
    rx: style.rx ?? undefined,
    ry: style.ry ?? undefined
  })} />`;
}
