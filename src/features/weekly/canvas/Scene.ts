import { Engine } from '@babylonjs/core/Engines/engine';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { Scene } from '@babylonjs/core/scene';
import { Vector3 } from '@babylonjs/core/Maths/math';
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { UiLabel } from '../../../gui';

let scene: Scene;
let light: HemisphericLight;
let camera: ArcRotateCamera | FreeCamera;

const drawGuide = () => {
  // Line
  const line = MeshBuilder.CreateDashedLines('scene_guide', {
    points: [Vector3.Zero(), Vector3.Right().multiply(new Vector3(-24, 0, 0))],
    dashSize: 0.5,
  });

  // Hour labels
  for (let i = 0; i <= 24; i++) {
    const tick = new UiLabel(`scene_guide_${i}`, i.toString());
    tick.setPosition(new Vector3(-i, 0, 0));
    tick.setWeight('bold');
    tick.setParent(line);
  }
};

// CreateScene function that creates and return the scene
const createScene = (ele: any, engine: Engine, cameraTarget: Vector3, guide = false) => {
  if (scene) {
    scene.dispose();
    camera.dispose();
    light.dispose();
  }
  scene = new Scene(engine);

  if (guide) {
    drawGuide();
  }

  // TODO: createCamera module?

  camera = new ArcRotateCamera('camera', Math.PI / 2, Math.PI / 2, 12, cameraTarget, scene);
  camera.wheelPrecision = 100;
  camera.lowerRadiusLimit = 6;
  camera.upperRadiusLimit = 25;
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
