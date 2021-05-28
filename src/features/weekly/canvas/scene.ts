import { Engine } from '@babylonjs/core/Engines/engine';
import { Scene } from '@babylonjs/core/scene';
import { Vector3 } from '@babylonjs/core/Maths/math';
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';

let scene: Scene;
let light: HemisphericLight;
let camera: ArcRotateCamera;

// CreateScene function that creates and return the scene
const createScene = (ele: any, engine: Engine) => {
  if (scene) {
    scene.dispose();
    camera.dispose();
    light.dispose();
  }
  scene = new Scene(engine);
  camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2.5, 3, new Vector3(0, 0, 0), scene);
  camera.attachControl(ele, true);
  light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
  return scene;
};

export { createScene, scene, light, camera };
