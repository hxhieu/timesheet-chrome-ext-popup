import React from 'react';
import * as pc from 'playcanvas';
import { POPUP_HEIGHT, POPUP_WIDTH } from '../../../popup/Popup';

const startApp = (ele: any) => {
  // create a PlayCanvas application
  const app = new pc.Application(ele, {});

  // fill the available space at full resolution
  app.setCanvasFillMode(pc.FILLMODE_NONE, POPUP_WIDTH, POPUP_HEIGHT);
  app.setCanvasResolution(pc.RESOLUTION_AUTO);

  // ensure canvas is resized when window changes size
  window.addEventListener('resize', () => app.resizeCanvas());

  // create box entity
  const box = new pc.Entity('cube');
  box.addComponent('model', {
    type: 'box',
  });
  app.root.addChild(box);

  // create camera entity
  const camera = new pc.Entity('camera');
  camera.addComponent('camera', {
    clearColor: new pc.Color(1, 1, 1),
    // projection: 'Orthographic',
  });
  app.root.addChild(camera);
  camera.setPosition(0, 0, 10);

  // create directional light entity
  const light = new pc.Entity('light');
  light.addComponent('light');
  app.root.addChild(light);
  light.setEulerAngles(45, 0, 0);

  // rotate the box according to the delta time since the last frame
  app.on('update', (dt) => box.rotate(100 * dt, 200 * dt, 300 * dt));

  app.start();
};

const App = React.memo(() => {
  return (
    <canvas
      ref={(ele) => {
        if (!ele) return;
        startApp(ele);
      }}
    />
  );
});

export default App;
