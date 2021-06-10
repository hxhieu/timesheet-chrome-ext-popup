import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { IGaugeProfile, ITimesheet } from '../../../types';
import DayGaugeSegment from './DayGaugeSegment';
import { MeshBase, UiLabel } from '../../../gui';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Angle } from '@babylonjs/core/Maths/math.path';
import { dayNames } from '../../../utils/date';
import { Color3 } from '@babylonjs/core/Maths/math.color';

class DayGauge extends MeshBase {
  public constructor(date: string, entries: ITimesheet[], profile: IGaugeProfile, index: number) {
    super(date, true);
    const {
      diameter,
      range: { start, end },
    } = profile;
    const height = end - start;

    const shell = MeshBuilder.CreateCylinder(`${date}_Gauge`, { diameter, height, sideOrientation: 0 });
    shell.isPickable = false;
    const material = new StandardMaterial('mat_day_gauge', shell.getScene());
    material.alpha = 0.2;
    material.specularColor = Color3.Black();
    material.specularPower = 0;
    shell.material = material;

    // Gauge label
    const label = this.createLabel(index, height);
    label.setParent(shell);

    // Transform the shell to correct position

    const gaugePosIdx = 3 - index;
    const yPos = gaugePosIdx * diameter * 1.5;

    // Make it sideway
    // shell.rotate(Vector3.Forward(), Angle.FromDegrees(90).radians());
    // Positioning
    shell.position = new Vector3(-(start + height / 2), yPos, 0);

    // Render day entries
    entries.forEach((entry) => {
      const segment = new DayGaugeSegment(entry, profile);
      // Translate to parent
      segment.setPosition({ y: yPos });
      // segment.setParent(shell);
    });

    // Guide line
    const line = this.createGuideLine(index, start, end);
    line.position.y = yPos;
    line.setParent(shell);
  }

  private createLabel = (index: number, gaugeLength: number) => {
    const label = new UiLabel(`${index}_date_label`, dayNames[index], '#fff', 80);
    label.setWeight('bold');
    // TODO: Hard code, don't now how to calc width of text in BJS, yet
    const textWidthInPx = 0.5;
    label.setPosition(new Vector3(0, -gaugeLength / 2 - textWidthInPx, 0));
    // Sideway
    label.rotateEuler(Vector3.Forward(), -90);
    return label;
  };

  private createGuideLine = (index: number, start: number, end: number) => {
    const line = MeshBuilder.CreateDashedLines(`${index}_guide`, {
      points: [new Vector3(-start, 0, 0), Vector3.Right().multiply(new Vector3(-end, 0, 0))],
      // 15mins per dash
      dashNb: (end - start) * 4,
    });
    line.alpha = 0.25;
    return line;
  };
}

export default DayGauge;
