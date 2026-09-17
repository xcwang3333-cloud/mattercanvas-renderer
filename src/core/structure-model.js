// MatterCanvas Renderer v0.1
// Unified structure data model

export class StructureModel {
  constructor({ atoms = [], lattice = null }) {
    this.atoms = atoms;
    this.lattice = lattice;
  }

  addAtom(element, position, index = null) {
    this.atoms.push({ element, position, index });
  }

  getElements() {
    return [...new Set(this.atoms.map(a => a.element))];
  }
}
