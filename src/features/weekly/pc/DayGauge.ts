import * as pc from 'playcanvas';
import { ITimesheet } from '../../../types';

const createGauge = (date: string, entries: ITimesheet[]) => {
  const root = new pc.Entity(date);

  // Test
  const box = new pc.Entity('box');
  box.addComponent('model', {
    type: 'box',
  });
  root.addChild(box);

  return root;
};

export { createGauge };
