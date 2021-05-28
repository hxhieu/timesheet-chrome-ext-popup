import { Engine } from '@babylonjs/core/Engines/engine';
import { Scene } from '@babylonjs/core/scene';

let engine: Engine;

const createEngine = (ele: any) => {
  if (engine) {
    engine.dispose();
  }
  engine = new Engine(ele, true, { preserveDrawingBuffer: true, stencil: true });
  // the canvas/window resize event handler
  window.addEventListener('resize', () => {
    engine.resize();
  });

  return engine;
};

export { createEngine, engine };
