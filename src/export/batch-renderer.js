// MatterCanvas Renderer - batch export workflow
// Keeps camera and style consistent across multiple structures

export async function batchRender(items, renderFunction, options = {}) {
  const results = [];

  for (const item of items) {
    const result = await renderFunction(item, {
      style: options.style || 'nature',
      camera: options.camera || 'publication-iso',
      filename: item.name ? `${item.name}.png` : 'structure.png'
    });

    results.push(result);
  }

  return results;
}
