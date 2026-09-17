// MatterCanvas Renderer v0.1
// Three.js atom / bond / lattice renderer

import * as THREE from 'three';
import { detectBonds } from '../core/bond-detector.js';
import { autoFitCamera } from './camera-utils.js';
import { attachOrbitControls } from './orbit-controls.js';

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
    this.camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(this.renderer.domElement);

    this.structureGroup = new THREE.Group();
    this.scene.add(this.structureGroup);

    this.controls = attachOrbitControls(this.camera, this.renderer);

    this.scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(5, 5, 5);
    this.scene.add(light);
  }

  loadStructure(structure) {
    this.structure = structure;
    this.structureGroup.clear();
    this.addAtoms(structure);
    this.addBonds(structure);
    this.addLattice(structure.lattice);
    autoFitCamera(this.camera, this.structureGroup);
  }

  addAtoms(structure) {
    structure.atoms.forEach(atom => {
      const style = elementStyle(atom.element);
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(style.radius * 0.35, 32, 32),
        new THREE.MeshStandardMaterial({ color: style.color })
      );
      mesh.position.set(...atom.position);
      this.structureGroup.add(mesh);
    });
  }

  addBonds(structure) {
    detectBonds(structure.atoms).forEach(bond => {
      const start = new THREE.Vector3(...structure.atoms[bond.atom1].position);
      const end = new THREE.Vector3(...structure.atoms[bond.atom2].position);
      const direction = end.clone().sub(start);
      const cylinder = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, direction.length(), 16),
        new THREE.MeshStandardMaterial({ color: 0x777777 })
      );
      cylinder.position.copy(start.clone().add(end).multiplyScalar(0.5));
      cylinder.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0), direction.normalize());
      this.structureGroup.add(cylinder);
    });
  }

  addLattice(lattice) {
    if (!lattice) return;

    const a = new THREE.Vector3(...lattice[0]);
    const b = new THREE.Vector3(...lattice[1]);
    const c = new THREE.Vector3(...lattice[2]);
    const points = [
      [0,0,0], a, b, c,
      a.clone().add(b),
      a.clone().add(c),
      b.clone().add(c),
      a.clone().add(b).add(c)
    ];

    const edges = [
      [0,1],[0,2],[0,3],[1,4],[1,5],
      [2,4],[2,6],[3,5],[3,6],
      [4,7],[5,7],[6,7]
    ];

    const vertices = [];
    edges.forEach(([i,j]) => {
      vertices.push(...points[i].toArray(), ...points[j].toArray());
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    const material = new THREE.LineBasicMaterial({ color: 0x777777, transparent:true, opacity:0.45 });
    this.structureGroup.add(new THREE.LineSegments(geometry, material));
  }

  render() {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
