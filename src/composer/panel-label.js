// Publication panel labels

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

export function panelLabel(index) {
  return `(${alphabet[index] || index + 1})`;
}

export function panelTitle(title, index) {
  return {
    label: panelLabel(index),
    title: title || ''
  };
}
