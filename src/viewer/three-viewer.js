// MatterCanvas Renderer v0.1
// Three.js viewer entry point

export class StructureViewer {
  constructor(container) {
    this.container = container;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
  }

  loadStructure(structure) {
    this.structure = structure;
  }
}
