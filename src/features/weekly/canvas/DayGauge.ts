import { Angle, Vector3 } from '@babylonjs/core/Maths/math';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { IGaugeProfile, ITimesheet } from '../../../types';
import { createDayGaugeSegment } from './DayGaugeSegment';
import { scene } from './Scene';

const createDayGauge = (date: string, entries: ITimesheet[], profile: IGaugeProfile) => {
  const {
    diameter,
    range: { start, end },
  } = profile;
  const shell = MeshBuilder.CreateCylinder(date, { diameter, height: end - start });
  shell.isPickable = false;
  shell.material = new StandardMaterial('mat_day_gauge', scene);
  shell.material.alpha = 0.25;

  entries.forEach((entry, idx) => {
    const segment = createDayGaugeSegment(entry, profile);
    shell.addChild(segment);
  });

  shell.rotate(Vector3.Forward(), Angle.FromDegrees(90).radians());

  return shell;
};

export { createDayGauge };
