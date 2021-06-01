import { Angle, Vector3 } from '@babylonjs/core/Maths/math';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { IGaugeProfile, ITimesheet } from '../../../types';
import { createDayGaugeSegment } from './DayGaugeSegment';
import { scene } from './Scene';
import { UiLabel } from '../../../gui';

const createDayGauge = (date: string, entries: ITimesheet[], profile: IGaugeProfile, index: number) => {
  const {
    diameter,
    range: { start, end },
  } = profile;
  const height = end - start;
  const shell = MeshBuilder.CreateCylinder(date, { diameter, height });
  shell.isPickable = false;
  shell.material = new StandardMaterial('mat_day_gauge', scene);
  shell.material.alpha = 0.25;

  entries.forEach((entry) => {
    const segment = createDayGaugeSegment(entry, profile);
    segment.parent = shell;
  });

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
  shell.locallyTranslate(new Vector3(gaugePosIdx * diameter * 1.5, start + height / 2, 0));

  return shell;
};

export { createDayGauge };
