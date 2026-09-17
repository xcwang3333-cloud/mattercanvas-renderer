export function classifyVaspFile(name = '') {
  const upper = name.toUpperCase();
  if (upper.includes('CONTCAR')) return 'optimized';
  if (upper.includes('POSCAR')) return 'initial';
  return 'unknown';
}

export function createVaspDropState(files = []) {
  return {
    files,
    structureCount: files.length,
    ready: files.length > 0
  };
}
