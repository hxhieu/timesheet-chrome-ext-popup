import React from 'react';
import * as pc from 'playcanvas';
import { WeeklyTimesheetState } from '../_slice';

import { createMousePickScript } from '../../../pc/MousePick';
import { POPUP_HEIGHT, POPUP_WIDTH } from '../../../const';

let app: pc.Application;
let camera: pc.CameraComponent;

/**
 * Create camera entity
 * @param initPosition
 * @returns
 */
const createCamera = (initPosition: pc.Vec3): pc.CameraComponent => {
  const cameraEntity = new pc.Entity('camera');
  cameraEntity.setPosition(initPosition);
  return cameraEntity.addComponent('camera', {
    clearColor: new pc.Color(0.3, 0.35, 0.4),
    // projection: 'Orthographic',
  }) as pc.CameraComponent;
};

/**
 * Create directional light entity
 * @returns
 */
const createLight = (): pc.LightComponent => {
  const lightEntity = new pc.Entity('light');
  lightEntity.setEulerAngles(60, 0, 0);
  return lightEntity.addComponent('light') as pc.LightComponent;
};

const createGauges = ({ dates, entries }: WeeklyTimesheetState) => {
  const material = new pc.StandardMaterial();
  // Update the material's diffuse and specular properties
  material.diffuse.set(1, 1, 1);
  // gaugeMaterial.specular.set(1, 1, 1);
  material.blendType = pc.BLEND_NORMAL;
  material.opacity = 0.25;
  // Notify the material that it has been modified
  material.update();

  Object.keys(dates).forEach((d, idx) => {
    const containerEntity = new pc.Entity(d);
    containerEntity.setLocalScale(18, 1, 1);
    containerEntity.setLocalPosition(0, -idx * 2, 0);
    containerEntity.addComponent('script');
    containerEntity.script.create('mousePick');
    app.root.addChild(containerEntity);
    containerEntity.addComponent('model', {
      type: 'box',
      material,
    }) as pc.ModelComponent;
  });
};

const createApp = (ele: any): pc.Application => {
  // create a PlayCanvas application
  app = new pc.Application(ele, {
    elementInput: new pc.ElementInput(ele),
    mouse: new pc.Mouse(ele),
    keyboard: new pc.Keyboard(window),
  });

  // fill the available space at full resolution
  app.setCanvasFillMode(pc.FILLMODE_NONE, POPUP_WIDTH, POPUP_HEIGHT);
  app.setCanvasResolution(pc.RESOLUTION_AUTO);
  app.scene.ambientLight = new pc.Color(0.2, 0.2, 0.2);

  // ensure canvas is resized when window changes size
  window.addEventListener('resize', () => app.resizeCanvas());

  createMousePickScript(app);

  return app;
};

interface Props {
  weekly: WeeklyTimesheetState;
}

const App = React.memo(({ weekly }: Props) => {
  console.log(weekly.busy);
  return (
    <canvas
      ref={(ele) => {
        if (!ele) return;
        // Main app
        app = createApp(ele);
        app.start();

        // Main camera
        camera = createCamera(new pc.Vec3(0, -6, 20));
        app.root.addChild(camera.entity);

        // Main light
        const light = createLight();
        app.root.addChild(light.entity);

        // Create the weekly gauge
        createGauges(weekly);
      }}
    />
  );
});

export default App;
