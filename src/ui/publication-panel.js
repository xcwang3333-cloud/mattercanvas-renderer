export const publicationPanelConfig = {
  modes: [
    'Nature single column',
    'Nature double column',
    'JACS',
    'Supplementary'
  ],
  defaultMode: 'Nature single column',
  actions: {
    importVaspFolder: true,
    generateFigure: true,
    exportSVG: true,
    exportPNG: true,
    exportPDF: true
  }
};

export function createPublicationPanelState() {
  return {
    journal: publicationPanelConfig.defaultMode,
    files: [],
    generated: false
  };
}
