// Figure panel layout helpers

export function createGridLayout(count, columns = 2, gap = 20) {
  const panels = [];
  for (let i = 0; i < count; i++) {
    panels.push({
      index: i,
      row: Math.floor(i / columns),
      column: i % columns,
      x: (i % columns) * gap,
      y: Math.floor(i / columns) * gap
    });
  }
  return panels;
}

export function panelLabel(index) {
  return `(${String.fromCharCode(97 + index)})`;
}
