import { Engine } from '@babylonjs/core/Engines/engine';
import { Scene } from '@babylonjs/core/scene';
import { Vector3 } from '@babylonjs/core/Maths/math';
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';

let scene: Scene;
let light: HemisphericLight;
let camera: ArcRotateCamera | FreeCamera;

// CreateScene function that creates and return the scene
const createScene = (ele: any, engine: Engine) => {
  if (scene) {
    scene.dispose();
    camera.dispose();
    light.dispose();
  }
  scene = new Scene(engine);

  // TODO: createCamera module?

  camera = new ArcRotateCamera('camera', Math.PI / 2, Math.PI / 2, 12, new Vector3(0, 0, 0), scene);
  camera.wheelPrecision = 100;
  camera.lowerRadiusLimit = 6;
  camera.upperRadiusLimit = 15;
  camera.lowerAlphaLimit = 0;
  camera.upperAlphaLimit = Math.PI;
  camera.keysDown = [83];
  camera.keysUp = [87];
  camera.keysLeft = [65];
  camera.keysRight = [68];

  // camera = new FreeCamera('camera', new Vector3(0, 0, -4), scene);

  camera.attachControl(ele, true);

  light = new HemisphericLight('light', new Vector3(0, 0, 1), scene);

  return scene;
};

export { createScene, scene, light, camera };
