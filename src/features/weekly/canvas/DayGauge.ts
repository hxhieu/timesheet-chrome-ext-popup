import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { IGaugeProfile, ITimesheet } from '../../../types';
import { MeshBase, UiLabel } from '../../../gui';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { dayOfWeek, toHourNumber } from '../../../utils/date';
import DayGaugeSegment from './DayGaugeSegment';

class DayGauge extends MeshBase {
  public constructor(date: string, entries: ITimesheet[], profile: IGaugeProfile) {
    super(date);

    const {
      diameter,
      range: { start, end },
    } = profile;
    const height = end - start;

    // Shell
    const shell = this.createShell(date, diameter, height);
    this.addChild(shell);

    // Gauge label
    const label = this.createLabel(date, height);
    label.setParent(shell);

    // Guide line
    const line = this.createGuideLine(date, height);
    line.setParent(shell);

    // Render day entries
    entries.forEach((entry) => {
      const segment = new DayGaugeSegment(entry, profile);
      const { StartText } = entry;

      // Position each segment according to the start hour
      const y = toHourNumber(StartText) - start - height / 2;
      segment.setPosition({ y });
      segment.setParent(shell);
    });

    // Position the shell so it pivot is at the Root
    shell.locallyTranslate(new Vector3(0, height / 2, 0));
  }

  private createShell = (date: string, diameter: number, height: number) => {
    const shell = MeshBuilder.CreateCylinder(`${date}_gauge`, { diameter, height, sideOrientation: 0 });
    shell.isPickable = false;
    const material = new StandardMaterial('mat_day_gauge', shell.getScene());
    material.alpha = 0.2;
    material.specularColor = Color3.Black();
    material.specularPower = 0;
    shell.material = material;
    return shell;
  };

  private createLabel = (date: string, height: number) => {
    const label = new UiLabel(`${date}_gauge_label`, dayOfWeek(date), '#fff', 80);
    label.setWeight('bold');
    // TODO: Hard code, don't now how to calc width of text in BJS, yet
    const textWidthInPx = 0.5;
    label.setPosition(new Vector3(0, -height / 2 - textWidthInPx, 0));
    // Sideway
    label.rotateEuler(Vector3.Forward(), -90);
    return label;
  };

  private createGuideLine = (date: string, height: number) => {
    const line = MeshBuilder.CreateDashedLines(`${date}_gauge_guide`, {
      points: [new Vector3(0, -height / 2, 0), new Vector3(0, height / 2, 0)],
      // 15mins per dash
      dashNb: height * 4,
    });
    line.alpha = 0.25;
    return line;
  };
}

export default DayGauge;
