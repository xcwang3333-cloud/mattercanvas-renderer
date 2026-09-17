// MatterCanvas high quality export utilities

export function exportHighResolutionPNG(renderer, filename='mattercanvas-figure.png', scale=3) {
  const canvas = renderer.domElement;
  const width = canvas.width;
  const height = canvas.height;

  const oldWidth = renderer.getSize(new Object()).width;
  const oldPixelRatio = renderer.getPixelRatio();

  renderer.setPixelRatio(scale);
  renderer.setSize(width * scale, height * scale, false);

  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png');
  link.click();

  renderer.setPixelRatio(oldPixelRatio);
  renderer.setSize(oldWidth, height, false);
}

export function enableTransparentBackground(renderer) {
  renderer.setClearColor(0x000000, 0);
}
