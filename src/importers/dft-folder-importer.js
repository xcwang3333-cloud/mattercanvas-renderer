// MatterCanvas Renderer v0.4-9
// Automatic VASP DFT folder importer for publication figures.

const LABEL_RULES = [
  { key: 'COOH', label: '*COOH' },
  { key: 'OCHO', label: '*OCHO' },
  { key: 'HCOOH', label: '*HCOOH' },
  { key: 'CO', label: '*CO' },
  { key: 'H', label: '*H' }
];

export function inferStructureLabel(name = '') {
  const upper = name.toUpperCase();
  const hit = LABEL_RULES.find(item => upper.includes(item.key));
  return hit ? hit.label : 'Pristine';
}

export function sortDftStructures(entries = []) {
  return [...entries].sort((a, b) => {
    if (a.label === 'Pristine') return -1;
    if (b.label === 'Pristine') return 1;
    return a.label.localeCompare(b.label);
  });
}

export async function loadDftFolder(files = [], parser) {
  const structures = [];

  for (const file of files) {
    const name = file.name || '';
    if (!/POSCAR|CONTCAR/i.test(name)) continue;

    const text = await file.text();
    structures.push({
      name,
      label: inferStructureLabel(name),
      structure: parser(text, name)
    });
  }

  return sortDftStructures(structures);
}
