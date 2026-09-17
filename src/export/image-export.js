// MatterCanvas Renderer
// Publication-quality image export

export function exportPNG(renderer, filename = 'structure.png', options = {}) {
  const scale = options.scale || 2;
  const canvas = renderer.domElement;

  const width = canvas.width;
  const height = canvas.height;

  const target = document.createElement('canvas');
  target.width = width * scale;
  target.height = height * scale;

  const ctx = target.getContext('2d');
  ctx.scale(scale, scale);
  ctx.drawImage(canvas, 0, 0);

  const link = document.createElement('a');
  link.download = filename;
  link.href = target.toDataURL('image/png');
  link.click();
}

export function setTransparentBackground(renderer) {
  renderer.setClearColor(0x000000, 0);
}
