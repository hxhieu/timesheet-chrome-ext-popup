import { Engine } from '@babylonjs/core/Engines/engine';

const createEngine = (ele: any) => {
  const engine = new Engine(ele, true, { preserveDrawingBuffer: true, stencil: true });
  // the canvas/window resize event handler
  window.addEventListener('resize', () => {
    engine.resize();
  });

  return engine;
};

export { createEngine };
