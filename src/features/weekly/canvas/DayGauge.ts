import { Angle, Color3, Vector3 } from '@babylonjs/core/Maths/math';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { IGaugeProfile, ITimesheet } from '../../../types';
import { createDayGaugeSegment } from './DayGaugeSegment';
import { scene } from './Scene';
import { UiLabel } from '../../../gui';
import { toHourNumber } from '../../../utils/date';

const createDayGauge = (date: string, entries: ITimesheet[], profile: IGaugeProfile, index: number) => {
  const {
    diameter,
    range: { start, end },
  } = profile;
  const height = end - start;
  const shell = MeshBuilder.CreateCylinder(date, { diameter, height });
  const material = new StandardMaterial('mat_day_gauge', scene);
  material.alpha = 0.15;
  shell.material = material;

  const label = new UiLabel(`${date}_date_label`, date, '#aaa');
  // TODO: Hard code, don't now how to calc width of text in BJS, yet
  const textWidthInPx = 2;
  label.setPosition(new Vector3(0, -(height - textWidthInPx) / 2, diameter / 2));
  // Sideway
  label.rotateEuler(Vector3.Forward(), -90);
  // Attach to the shell
  label.setParent(shell);

  // Transform the shell to correct position

  const gaugePosIdx = 3 - index;

  // Make it sideway
  shell.rotate(Vector3.Forward(), Angle.FromDegrees(90).radians());
  // Positioning
  shell.position = new Vector3(-(start + height / 2), gaugePosIdx * diameter * 1.5, 0);

  entries.forEach((entry) => {
    const { Hours, StartText } = entry;
    const segment = createDayGaugeSegment(entry, profile);
    // Transform
    segment.rotate(Vector3.Forward(), Angle.FromDegrees(90).radians());
    const startHour = toHourNumber(StartText);
    segment.position = new Vector3(-startHour - Hours / 2, gaugePosIdx * diameter * 1.5, 0);
    segment.setParent(shell);
  });

  return shell;
};

export { createDayGauge };
