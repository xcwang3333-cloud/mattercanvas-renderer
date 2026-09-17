export function createPublicationWorkflow({
  importer,
  generator,
  exporter,
}) {
  return {
    async run({ files, preset, template }) {
      const structures = await importer(files);

      const figure = await generator({
        structures,
        preset,
        template,
      });

      return figure;
    },

    async export(figure, format, options = {}) {
      return exporter({
        figure,
        format,
        options,
      });
    },
  };
}
