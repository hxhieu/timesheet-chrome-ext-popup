import React from 'react';
import styled from '@emotion/styled';
import { debounce } from 'debounce';
import { WeeklyTimesheetState } from '../_slice';
import { createEngine } from './Engine';
import { createScene } from './Scene';
import { IGaugeProfile, ITimesheet } from '../../../types';
import { createDayGauge } from './DayGauge';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';

// let app: pc.Application;
// let camera: pc.CameraComponent;

// /**
//  * Create camera entity
//  * @param initPosition
//  * @returns
//  */
// const createCamera = (initPosition: pc.Vec3): pc.CameraComponent => {
//   const cameraEntity = new pc.Entity('camera');
//   cameraEntity.setPosition(initPosition);
//   return cameraEntity.addComponent('camera', {
//     clearColor: new pc.Color(0.3, 0.35, 0.4),
//     // projection: 'Orthographic',
//   }) as pc.CameraComponent;
// };

// /**
//  * Create directional light entity
//  * @returns
//  */
// const createLight = (): pc.LightComponent => {
//   const lightEntity = new pc.Entity('light');
//   lightEntity.setEulerAngles(60, 0, 0);
//   return lightEntity.addComponent('light') as pc.LightComponent;
// };

// const createGauges = ({ dates, entries }: WeeklyTimesheetState) => {
//   const material = new pc.StandardMaterial();
//   // Update the material's diffuse and specular properties
//   material.diffuse.set(1, 1, 1);
//   // gaugeMaterial.specular.set(1, 1, 1);
//   material.blendType = pc.BLEND_NORMAL;
//   material.opacity = 0.25;
//   // Notify the material that it has been modified
//   material.update();

//   Object.keys(dates).forEach((d, idx) => {
//     const e = new pc.Entity(d);
//     app.root.addChild(e);

//     const type = 'box';
//     e.setLocalEulerAngles(90, 90, 0);
//     e.setLocalPosition(0, -idx * 2, 0);
//     e.addComponent('script');
//     e.script.create('mousePick');
//     const model = e.addComponent('model', {
//       type,
//       material,
//     }) as any;
//     e.addComponent('rigidbody', {
//       type: 'static',
//     });
//     model.height = 10;
//     const collision: pc.CollisionComponent = e.addComponent('collision', {
//       type: type,
//       // height: type === 'capsule' ? 2 : 1,
//     }) as pc.CollisionComponent;

//     e.setLocalScale(1, 16, 1);
//     collision.halfExtents = new pc.Vec3(1, 1, 1);
//   });
// };

// const createApp = (ele: any): pc.Application => {
//   // create a PlayCanvas application
//   app = new pc.Application(ele, {
//     elementInput: new pc.ElementInput(ele),
//     mouse: new pc.Mouse(ele),
//     keyboard: new pc.Keyboard(window),
//   });

//   // fill the available space at full resolution
//   app.setCanvasFillMode(pc.FILLMODE_NONE, POPUP_WIDTH, POPUP_HEIGHT);
//   app.setCanvasResolution(pc.RESOLUTION_AUTO);
//   app.scene.ambientLight = new pc.Color(0.2, 0.2, 0.2);

//   // ensure canvas is resized when window changes size
//   window.addEventListener('resize', () => app.resizeCanvas());

//   createMousePickScript(app);

//   return app;
// };

// // CreateScene function that creates and return the scene
// const createScene = (engine: Engine, ele: any) => {
//   const scene = new Scene(engine);

//   const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 2.5, 3, new Vector3(0, 0, 0), scene);
//   camera.attachControl(ele, true);

//   const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);

//   const box = MeshBuilder.CreateBox('box', {
//     width: 10,
//   });

//   return scene;
// };

// const createBabylon = (ele: any) => {
//   let engine = new Engine(ele, true, { preserveDrawingBuffer: true, stencil: true });

//   // call the createScene function
//   let scene = createScene(engine, ele);
//   // run the render loop
//   engine.runRenderLoop(() => {
//     scene.render();
//   });
//   // the canvas/window resize event handler
//   window.addEventListener('resize', () => {
//     engine.resize();
//   });
// };

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

let _weekly: WeeklyTimesheetState;
let _gaugeProfile: IGaugeProfile;

const createCanvas = (ele: any) => {
  if (!ele) return;
  const engine = createEngine(ele);
  const { start, end } = _gaugeProfile.range;

  const cameraXPos = -start - (end - start) / 2;
  const scene = createScene(ele, engine, new Vector3(cameraXPos, 0, 0), true);

  engine.runRenderLoop(() => {
    scene.render();
  });

  // Render each day
  Object.keys(_weekly.dates).forEach((d, idx) => {
    const entries: ITimesheet[] = [];
    for (const entryId of _weekly.dates[d].entries) {
      entries.push(_weekly.entries[entryId]);
    }
    const gauge = createDayGauge(d, entries, _gaugeProfile, idx);
  });
};

interface Props {
  weekly: WeeklyTimesheetState;
  gaugeProfile: IGaugeProfile;
}

const App = React.memo(({ weekly, gaugeProfile }: Props) => {
  _weekly = weekly;
  _gaugeProfile = gaugeProfile;
  // Debounce to deal with aggressive React props rerendering
  return <Canvas ref={debounce(createCanvas, 500)} />;
});

export default App;
