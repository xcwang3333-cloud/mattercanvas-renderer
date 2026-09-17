// MatterCanvas Renderer v0.3
// Multi-panel scientific figure composer

export function composeFigure(panels=[], options={}){
  const columns = options.columns || 2;
  const gap = options.gap || 20;
  const panelWidth = options.panelWidth || 400;
  const panelHeight = options.panelHeight || 400;

  const rows = Math.ceil(panels.length / columns);
  const width = columns * panelWidth + (columns-1)*gap;
  const height = rows * panelHeight + (rows-1)*gap;

  return {
    width,
    height,
    columns,
    rows,
    panels: panels.map((panel,index)=>({
      ...panel,
      x:(index%columns)*(panelWidth+gap),
      y:Math.floor(index/columns)*(panelHeight+gap)
    }))
  };
}
