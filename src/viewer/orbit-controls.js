// MatterCanvas Renderer v0.1
// Simple camera interaction controller

export class OrbitControlsLite {
  constructor(camera, domElement) {
    this.camera = camera;
    this.domElement = domElement;
    this.enabled = true;

    domElement.addEventListener('wheel', (event)=>{
      this.camera.position.z += event.deltaY * 0.01;
    });
  }
}
