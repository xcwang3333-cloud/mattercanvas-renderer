// MatterCanvas Renderer v0.1
// Camera fitting utilities for scientific structures

import * as THREE from 'three';

export function autoFitCamera(camera, structureGroup, padding = 1.8) {
  const box = new THREE.Box3().setFromObject(structureGroup);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const maxSize = Math.max(size.x, size.y, size.z);

  const distance = maxSize * padding;

  camera.position.copy(center.clone().add(new THREE.Vector3(distance, distance, distance)));
  camera.lookAt(center);
  camera.near = Math.max(0.1, maxSize / 100);
  camera.far = maxSize * 100;
  camera.updateProjectionMatrix();

  return center;
}
