import { createPublicationWorkflow } from '../src/app/publication-workflow.js';

function mockImporter(files) {
  return Promise.resolve(files.map(file => ({ name: file })));
}

function mockGenerator(payload) {
  return Promise.resolve(payload);
}

function mockExporter(payload) {
  return Promise.resolve(payload.format);
}

test('publication workflow runs importer generator exporter chain', async () => {
  const workflow = createPublicationWorkflow({
    importer: mockImporter,
    generator: mockGenerator,
    exporter: mockExporter,
  });

  const figure = await workflow.run({
    files: ['CONTCAR'],
    preset: 'PbN4',
    template: 'Nature',
  });

  expect(figure.preset).toBe('PbN4');

  const result = await workflow.export(figure, 'svg');
  expect(result).toBe('svg');
});
