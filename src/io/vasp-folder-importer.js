// MatterCanvas Renderer v0.4-9
// Automatic VASP folder importer for publication figure generation.

function normalizeName(name = '') {
  return name.toLowerCase().replace(/\\s+/g, '');
}

export function inferStructureRole(filename = '') {
  const name = normalizeName(filename);

  if (name.includes('cooh')) return '*COOH';
  if (name.includes('ocho')) return '*OCHO';
  if (name.includes('hcooh')) return 'HCOOH';
  if (name.includes('co')) return '*CO';
  if (name.includes('h')) return '*H';

  return 'pristine';
}

export function sortPublicationStructures(items = []) {
  const order = {
    pristine: 0,
    '*COOH': 1,
    '*OCHO': 2,
    '*CO': 3,
    HCOOH: 4,
    '*H': 5
  };

  return [...items].sort((a, b) => {
    return (order[a.role] ?? 99) - (order[b.role] ?? 99);
  });
}

export async function importVaspFolder(files = [], parser) {
  const structures = [];

  for (const file of files) {
    const role = inferStructureRole(file.name);
    const text = await file.text();
    const structure = await parser(text, file.name);

    structures.push({
      name: file.name,
      role,
      structure
    });
  }

  return sortPublicationStructures(structures);
}
