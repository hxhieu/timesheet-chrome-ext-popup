import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { IGaugeProfile, ITimesheet } from '../../../types';
import { createDayGaugeSegment } from './DayGaugeSegment';
import { scene } from './Scene';
import { UiLabel } from '../../../gui';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Angle } from '@babylonjs/core/Maths/math.path';
import { dayNames } from '../../../utils/date';

const createDayGauge = (date: string, entries: ITimesheet[], profile: IGaugeProfile, index: number) => {
  const {
    diameter,
    range: { start, end },
  } = profile;
  const height = end - start;
  const shell = MeshBuilder.CreateCylinder(date, { diameter, height });
  const material = new StandardMaterial('mat_day_gauge', scene);
  material.alpha = 0.2;
  shell.material = material;

  const name = `${index}_${date}`;

  const label = new UiLabel(`${name}_date_label`, dayNames[index], '#fff', 80);
  label.setWeight('bold');
  // TODO: Hard code, don't now how to calc width of text in BJS, yet
  const textWidthInPx = 0.5;
  label.setPosition(new Vector3(0, -height / 2 - textWidthInPx, 0));
  // Sideway
  label.rotateEuler(Vector3.Forward(), -90);
  // Attach to the shell
  label.setParent(shell);

  // Transform the shell to correct position

  const gaugePosIdx = 3 - index;
  const yPos = gaugePosIdx * diameter * 1.5;

  // Make it sideway
  shell.rotate(Vector3.Forward(), Angle.FromDegrees(90).radians());
  // Positioning
  shell.position = new Vector3(-(start + height / 2), yPos, 0);

  // Render day entries
  entries.forEach((entry) => {
    const segment = createDayGaugeSegment(entry, profile);
    // Translate to parent
    segment.position.y = yPos;
    segment.setParent(shell);
  });

  // Guide line
  const line = MeshBuilder.CreateDashedLines(`${name}_guide`, {
    points: [new Vector3(-start, 0, 0), Vector3.Right().multiply(new Vector3(-end, 0, 0))],
    // 15mins per dash
    dashNb: (end - start) * 4,
  });
  line.position.y = yPos;
  line.alpha = 0.25;
  line.setParent(shell);

  return shell;
};

export { createDayGauge };
