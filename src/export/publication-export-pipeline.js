export const PUBLICATION_EXPORT_FORMATS = {
  svg: { vector: true, editable: true },
  png: { scale: 4, dpi: 600 },
  pdf: { vector: true }
};

export function createPublicationExportPackage(figureSvg, options = {}) {
  return {
    svg: figureSvg,
    metadata: {
      journal: options.journal || 'Nature',
      template: options.template || 'single-column',
      createdAt: new Date().toISOString()
    },
    formats: PUBLICATION_EXPORT_FORMATS
  };
}
