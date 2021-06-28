import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { ITimesheet } from '../../../types';
import { MeshBase, UiLabel } from '../../../gui';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Angle } from '@babylonjs/core/Maths/math.path';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { dayOfWeek } from '../../../utils/date';

class DayGauge extends MeshBase {
  public constructor(date: string, entries: ITimesheet[], diameter: number, height: number) {
    super(date, true);

    // Shell
    const shell = this.createShell(date, diameter, height);
    this.addChild(shell);

    // Gauge label
    const label = this.createLabel(date, height);
    label.setParent(shell);

    // Guide line
    const line = this.createGuideLine(date, height);
    line.setParent(shell);

    // Transform the shell to correct position
    shell.rotate(Vector3.Forward(), Angle.FromDegrees(90).radians());
    shell.position = new Vector3(-height / 2, 0, 0);

    // // Render day entries
    // entries.forEach((entry) => {
    //   const segment = new DayGaugeSegment(entry, profile);
    //   // Translate to parent
    //   // segment.setPosition({ y: yPos });
    //   segment.setParent(shell);
    // });

    // Align the shell, using Root as pivot point

    // this.setPosition({ x: 0, y: yPos, z: 0 });
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
