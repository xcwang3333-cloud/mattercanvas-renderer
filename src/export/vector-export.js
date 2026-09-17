// MatterCanvas Renderer v0.3
// Vector export engine

function esc(value){
  return String(value).replace(/&/g,'&amp;').replace(/</g,'&lt;');
}

export function generateSVG(structure, options={}){
  const width = options.width || 800;
  const height = options.height || 800;
  const atoms = structure?.atoms || [];

  const circles = atoms.map((atom)=>{
    const x = width/2 + atom.position[0]*options.scale;
    const y = height/2 - atom.position[1]*options.scale;
    const r = options.atomRadius || 8;
    const color = options.colors?.[atom.element] || '#888888';
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>`;
  }).join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
<rect width="100%" height="100%" fill="${options.background || '#ffffff'}"/>
${circles}
</svg>`;
}

export function exportSVG(svg, filename='structure.svg'){
  const blob = new Blob([svg], {type:'image/svg+xml'});
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
