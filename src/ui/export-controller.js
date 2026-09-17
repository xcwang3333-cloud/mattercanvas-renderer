export function createExportController(generator, exporter) {
  return {
    async generate(input) {
      const figure = await generator(input);
      return figure;
    },
    async exportSVG(figure) {
      return exporter('svg', figure);
    },
    async exportPNG(figure) {
      return exporter('png', figure);
    },
    async exportPDF(figure) {
      return exporter('pdf', figure);
    }
  };
}
