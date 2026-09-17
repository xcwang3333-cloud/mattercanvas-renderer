export function createReleaseCandidateWorkflow({ importer, generator, exporter }) {
  return {
    async validate(files, options = {}) {
      const structures = await importer(files);
      const figure = await generator(structures, options);
      return {
        structureCount: structures.length,
        figure,
        exportReady: Boolean(figure)
      };
    },
    async export(files, options = {}) {
      const result = await this.validate(files, options);
      return exporter(result.figure, options);
    }
  };
}
