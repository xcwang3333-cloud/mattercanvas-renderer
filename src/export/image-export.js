// MatterCanvas Renderer v0.1
// PNG export utility

export function exportPNG(renderer, filename = 'structure.png') {
  const canvas = renderer.domElement;
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();
}
