import '@babylonjs/core/Rendering/outlineRenderer';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { Angle } from '@babylonjs/core/Maths/math.path';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { IGaugeProfile, ITimesheet } from '../../../types';
import { getProjectMaterial } from '../../../utils';
import { toHourNumber } from '../../../utils/date';
import { ActionEvent } from '@babylonjs/core/Actions/actionEvent';
import { MeshBase } from '../../../gui';

class DayGaugeSegment extends MeshBase {
  private _entry: ITimesheet;
  private _length: number;
  private _diameter: number;
  private DEFAULT_OUTLINE_WIDTH = 0.05;

  public constructor(entry: ITimesheet, profile: IGaugeProfile) {
    super(`Record_${entry.TimesheetId}`);
    const { StartText, Hours } = entry;
    const [gauge, length, diameter] = this.createGauge(entry, profile);
    this._length = length;
    this._diameter = diameter;

    // Keep a reference to the entry
    this._entry = entry;

    this.addChild(gauge);
    this.addMouseInteractions(gauge);

    this.setPosition({ x: -toHourNumber(StartText) - Hours / 2 });
    // this.rotateEuler(Vector3.Forward(), 90);
  }

  protected onPointerOver = (evt: ActionEvent) => {
    const gauge = evt.meshUnderPointer;
    gauge.outlineColor = Color3.White();
    gauge.outlineWidth = gauge.outlineWidth = this.DEFAULT_OUTLINE_WIDTH * 2;
  };

  protected onPointerOut = (evt: ActionEvent) => {
    const gauge = evt.meshUnderPointer;
    const { Charge } = this._entry;
    gauge.outlineColor = Charge === 'N/C' ? Color3.Red() : Color3.Green();
    gauge.outlineWidth = this.DEFAULT_OUTLINE_WIDTH;
  };

  private createGauge = (
    entry: ITimesheet,
    profile: IGaugeProfile,
  ): [gauge: Mesh, length: number, diameter: number] => {
    const { Hours, ProjectId, Charge, StartText } = entry;
    let { diameter, segmentPadding } = profile;
    // 1 unit = 1 hour
    // Add some padding
    const height = Hours - segmentPadding * 2;
    diameter = diameter * 0.7;
    const gauge = MeshBuilder.CreateCylinder(`entry_${entry.TimesheetId}`, {
      diameter,
      height,
    });
    gauge.isPickable = true;
    gauge.material = getProjectMaterial(ProjectId);

    // Charge vs N/C
    gauge.renderOutline = true;
    gauge.outlineColor = Charge === 'N/C' ? Color3.Red() : Color3.Green();
    gauge.outlineWidth = this.DEFAULT_OUTLINE_WIDTH;

    // Transform
    // gauge.rotate(Vector3.Forward(), Angle.FromDegrees(90).radians());
    gauge.position.y = -toHourNumber(StartText) - Hours / 2;

    return [gauge, height, diameter];
  };
}

export default DayGaugeSegment;
