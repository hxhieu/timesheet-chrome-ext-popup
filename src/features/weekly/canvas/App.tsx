import React, { useState } from 'react';
import styled from '@emotion/styled';
import { debounce } from 'debounce';
import { createEngine } from './Engine';
import { createScene } from './Scene';
import { DashboardData, ITimesheet } from '../../../types';
import DayGauge from './DayGauge';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { generateDefaultMaterials, generateProjectMaterials } from '../../../utils';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

let _data: DashboardData;

const createCanvas = (ele: any) => {
  if (!ele) return;
  const engine = createEngine(ele);
  const { weekly, gaugeProfile } = _data;
  const { start, end } = gaugeProfile.range;

  const cameraXPos = -start - (end - start) / 2;
  const scene = createScene(ele, engine, new Vector3(cameraXPos, 0, 0), false);

  // Generate materials cache
  generateProjectMaterials(_data.projectColours, scene);
  generateDefaultMaterials(scene);

  engine.runRenderLoop(() => {
    scene.render();
  });

  // Render each day
  Object.keys(weekly.dates).forEach((d, idx) => {
    const entries: ITimesheet[] = [];
    for (const entryId of weekly.dates[d].entries) {
      entries.push(weekly.entries[entryId]);
    }
    const gauge = new DayGauge(d, entries, _data.gaugeProfile, idx);
  });
};

const App = React.memo((data: DashboardData) => {
  // TODO: Since the canvas is not React so we need to pass the data one-way
  // Can it be done smarter?
  _data = data;
  // Debounce to deal with aggressive React props rerendering
  return <Canvas ref={debounce(createCanvas, 500)} />;
});

export default App;
