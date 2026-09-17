// Publication exporter pipeline
// Converts a generated publication figure object into export jobs.

export function createPublicationExportJob(figure, options = {}) {
  return {
    name: options.name || 'publication-figure',
    formats: options.formats || ['svg', 'png', 'pdf'],
    figure,
    metadata: {
      template: figure?.template || null,
      style: figure?.style || null,
      createdAt: new Date().toISOString()
    }
  };
}

export function exportTargets(job) {
  return (job.formats || []).map(format => ({
    format,
    filename: `${job.name}.${format}`
  }));
}
