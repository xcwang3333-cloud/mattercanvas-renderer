// One-click workflow: DFT folder -> publication figure

import { buildPublicationFigure } from '../composer/publication-figure-builder.js';
import { createPublicationExportJob } from '../export/publication-exporter.js';

export function generateDftPublicationFigure(input) {
  const figure = buildPublicationFigure({
    structures: input.structures || [],
    template: input.template,
    style: input.style || 'nature',
    renderer: input.renderer
  });

  return createPublicationExportJob(figure, {
    name: input.name || 'DFT_publication_figure',
    formats: input.formats || ['svg', 'png', 'pdf']
  });
}
