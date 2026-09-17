// MatterCanvas Renderer v0.4
// Load multiple VASP POSCAR/CONTCAR files into ordered DFT figure panels.

import { parsePOSCAR } from '../parser/poscar-parser.js';

function normalizePath(file) {
  return (file.webkitRelativePath || file.name || '').replace(/\\/g, '/');
}

function dirname(path) {
  const parts = path.split('/').filter(Boolean);
  return parts.length > 1 ? parts.slice(0, -1).join('/') : '';
}

function stem(path) {
  const name = path.split('/').pop() || path;
  return name.replace(/\.[^.]+$/, '');
}

function reactionTitle(label) {
  const text = label.toLowerCase();
  if (text.includes('hcooh')) return '*HCOOH';
  if (text.includes('cooh')) return '*COOH';
  if (text.includes('ocho')) return '*OCHO';
  if (/(^|[-_])co($|[-_])/i.test(label) || text.endsWith('co')) return '*CO';
  if (/(^|[-_])h($|[-_])/i.test(label) || text.endsWith('-h')) return '*H';
  return 'Pristine';
}

function rank(title) {
  return ({ Pristine: 0, '*COOH': 1, '*OCHO': 2, '*HCOOH': 3, '*CO': 4, '*H': 5 })[title] ?? 99;
}

function groupLabel(path) {
  const dir = dirname(path);
  if (dir) return dir.split('/').pop();
  return stem(path);
}

function isVaspStructureFile(file) {
  const name = (file.name || '').toLowerCase();
  return name === 'poscar' || name === 'contcar' || name.endsWith('.vasp');
}

export async function loadDftPanels(fileList) {
  const files = Array.from(fileList || []).filter(isVaspStructureFile);
  if (!files.length) throw new Error('No POSCAR, CONTCAR, or .vasp structure files were selected.');

  // Group directory imports and prefer relaxed CONTCAR over POSCAR when both exist.
  const groups = new Map();
  for (const file of files) {
    const path = normalizePath(file);
    const key = dirname(path) || stem(path);
    const current = groups.get(key);
    const name = (file.name || '').toLowerCase();
    const priority = name === 'contcar' ? 3 : name === 'poscar' ? 2 : 1;
    if (!current || priority > current.priority) groups.set(key, { file, path, priority });
  }

  const panels = [];
  for (const { file, path } of groups.values()) {
    const text = await file.text();
    const structure = parsePOSCAR(text, file.name || 'POSCAR');
    const label = groupLabel(path);
    const title = reactionTitle(label);
    panels.push({
      id: `panel-${panels.length + 1}`,
      title,
      sourceLabel: label,
      sourcePath: path,
      structure
    });
  }

  panels.sort((a, b) => rank(a.title) - rank(b.title) || a.sourceLabel.localeCompare(b.sourceLabel));
  return panels.map((panel, index) => ({ ...panel, label: `(${String.fromCharCode(97 + index)})` }));
}

export { reactionTitle };
