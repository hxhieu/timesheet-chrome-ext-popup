import { Engine } from '@babylonjs/core/Engines/engine';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { Scene } from '@babylonjs/core/scene';
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { UiLabel } from '../../../gui';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { createSegmentTooltip } from './DayGaugeSegmentTooltip';
import { getEnv } from '../../../utils';

let scene: Scene;
let light: HemisphericLight;
let camera: ArcRotateCamera | FreeCamera;

const drawGuide = () => {
  // Line
  const line = MeshBuilder.CreateDashedLines('scene_guide', {
    points: [Vector3.Zero(), Vector3.Right().multiply(new Vector3(24, 0, 0))],
    dashSize: 0.5,
  });

  // Hour labels
  for (let i = 0; i <= 24; i++) {
    const tick = new UiLabel(`scene_guide_${i}`, i.toString());
    tick.setPosition(new Vector3(i, 0, 0));
    tick.setParent(line);
  }
};

// CreateScene function that creates and return the scene
const createScene = (ele: any, engine: Engine, cameraTarget: Vector3, debug?: boolean) => {
  if (scene) {
    scene.dispose();
    camera.dispose();
    light.dispose();
  }
  scene = new Scene(engine);

  const useDebug = debug || getEnv().babylonJsDebug === 'true';
  if (useDebug) {
    drawGuide();
  }

  // TODO: createCamera module?

  camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2, 10, cameraTarget, scene);
  camera.wheelPrecision = 100;
  camera.lowerRadiusLimit = 6;
  camera.upperRadiusLimit = 25;
  camera.lowerAlphaLimit = -Math.PI;
  camera.upperAlphaLimit = 0;
  camera.keysDown = [83];
  camera.keysUp = [87];
  camera.keysLeft = [65];
  camera.keysRight = [68];
  // camera = new FreeCamera('camera', new Vector3(0, 0, -4), scene);

  camera.attachControl(ele, true);

  light = new HemisphericLight('light', new Vector3(0, 0, -1), scene);

  // const box = MeshBuilder.CreateBox('aaa', {});
  // box.enablePointerMoveEvents = true;
  // box.isPickable = true;

  // ele.addEventListener(
  //   'click',
  //   (event) => {
  //     // var pickResult = scene.pick(event.clientX, event.clientY, null, null, cameraPlayer);
  //     console.log(camera);
  //     let pickResult = scene.pick(event.offsetX, event.offsetY, null, false, camera);
  //     console.log(event.offsetX);

  //     console.log(pickResult.ray);

  //     if (pickResult.pickedMesh) {
  //       alert(pickResult.pickedMesh.name);
  //     }
  //   },
  //   false,
  // );

  return scene;
};

export { createScene };
