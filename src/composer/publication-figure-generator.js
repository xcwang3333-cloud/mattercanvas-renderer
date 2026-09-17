// MatterCanvas Renderer v0.4-9
// Publication figure generation pipeline.

import { composeDftFigureSvg } from './dft-figure-composer.js';
import { importVaspFolder } from '../io/vasp-folder-importer.js';

export async function generatePublicationFigure({
  files,
  parser,
  preset,
  layout = '2x2'
}) {
  const structures = await importVaspFolder(files, parser);

  const panels = structures.map((item, index) => ({
    label: `(${String.fromCharCode(97 + index)})`,
    title: item.role,
    structure: item.structure
  }));

  return composeDftFigureSvg(panels, {
    layout,
    style: preset?.style || 'nature',
    highlight: preset?.highlight,
    coordination: preset?.coordination
  });
}
