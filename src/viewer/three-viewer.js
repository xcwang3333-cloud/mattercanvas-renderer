// MatterCanvas Renderer v0.1
// Three.js atom / bond / lattice renderer

import * as THREE from 'three';

const ELEMENTS = {
  H: { color: 0xffffff, radius: 0.31 },
  C: { color: 0x444444, radius: 0.76 },
  N: { color: 0x3050f8, radius: 0.71 },
  O: { color: 0xff0d0d, radius: 0.66 },
  S: { color: 0xffff30, radius: 1.05 },
  Fe: { color: 0xe06633, radius: 1.26 },
  Co: { color: 0xf090a0, radius: 1.25 },
  Ni: { color: 0x50d050, radius: 1.24 },
  Pb: { color: 0x575961, radius: 1.46 }
};

function elementStyle(symbol) {
  return ELEMENTS[symbol] || { color: 0xaaaaaa, radius: 1.0 };
}

export class StructureViewer {
  constructor(container) {
    this.container = container;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(this.renderer.domElement);

    this.camera.position.set(0, 0, 20);

    this.scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(5, 5, 5);
    this.scene.add(light);
  }

  loadStructure(structure) {
    this.structure = structure;
    this.addAtoms(structure);
    this.addLattice(structure.lattice);
  }

  addAtoms(structure) {
    const group = new THREE.Group();
    structure.atoms.forEach(atom => {
      const style = elementStyle(atom.element);
      const geometry = new THREE.SphereGeometry(style.radius * 0.35, 32, 32);
      const material = new THREE.MeshStandardMaterial({ color: style.color });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...atom.position);
      group.add(mesh);
    });
    this.scene.add(group);
  }

  addLattice(lattice) {
    if (!lattice) return;
    const points = [
      new THREE.Vector3(0,0,0),
      new THREE.Vector3(...lattice[0]),
      new THREE.Vector3(...lattice[1]),
      new THREE.Vector3(...lattice[2])
    ];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0x777777 });
    this.scene.add(new THREE.Line(geometry, material));
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
