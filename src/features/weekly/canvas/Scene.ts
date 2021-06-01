import { Engine } from '@babylonjs/core/Engines/engine';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { Scene } from '@babylonjs/core/scene';
import { TextBlock } from '@babylonjs/gui/2D/controls/textBlock';
import { Color3, Color4, Vector3, Angle } from '@babylonjs/core/Maths/math';
import { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture';
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';

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
    const tickLabel = MeshBuilder.CreatePlane(`scene_guide_${i}`, {
      size: 4,
    });

    // TODO: Hard code, don't now how to calc width of text in BJS, yet
    tickLabel.position.x = -i;
    // tickLabel.rotate(Vector3.Forward(), Angle.FromDegrees(-90).radians());
    tickLabel.parent = line;
    // Flip around X to use LH coordinate system
    tickLabel.scaling.set(-1, 1, 1);
    const advancedTexture = AdvancedDynamicTexture.CreateForMesh(tickLabel);

    const text = new TextBlock(`scene_guide_${i}_text`, i.toString());
    text.fontSize = 60;
    text.fontWeight = 'bold';
    text.color = 'white';
    advancedTexture.addControl(text);
    console.log(i);
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

  camera = new ArcRotateCamera('camera', Math.PI / 2, Math.PI / 2, 20, cameraTarget, scene);
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
