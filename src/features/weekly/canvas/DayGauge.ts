import { Angle, Vector3 } from '@babylonjs/core/Maths/math';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { TextBlock } from '@babylonjs/gui/2D/controls/textBlock';
import { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture';
import { IGaugeProfile, ITimesheet } from '../../../types';
import { createDayGaugeSegment } from './DayGaugeSegment';
import { scene } from './Scene';

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

  entries.forEach((entry, idx) => {
    const segment = createDayGaugeSegment(entry, profile);
    shell.addChild(segment);
  });

  const dateLabel = MeshBuilder.CreatePlane(`${date}_date_label`, {
    size: 4,
  });

  // TODO: Hard code, don't now how to calc width of text in BJS, yet
  const textWidthInPx = 2;
  dateLabel.position.y = -(height - textWidthInPx) / 2;
  dateLabel.position.z = diameter / 2;
  dateLabel.rotate(Vector3.Forward(), Angle.FromDegrees(-90).radians());
  dateLabel.parent = shell;
  // Flip around X to use LH coordinate system
  dateLabel.scaling.set(-1, 1, 1);
  const advancedTexture = AdvancedDynamicTexture.CreateForMesh(dateLabel);

  const text = new TextBlock(`${date}_date_label_text`, date);
  text.fontSize = 100;
  text.fontWeight = 'bold';
  text.color = 'white';
  advancedTexture.addControl(text);

  const gaugePosIdx = 3 - index;
  // Make it sideway
  shell.rotate(Vector3.Forward(), Angle.FromDegrees(90).radians());
  // Positioning
  shell.locallyTranslate(new Vector3(gaugePosIdx * diameter * 1.5, start + height / 2, 0));

  return shell;
};

export { createDayGauge };
