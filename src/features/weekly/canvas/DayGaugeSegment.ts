import '@babylonjs/core/Rendering/outlineRenderer';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { IGaugeProfile, ITimesheet } from '../../../types';
import { getProjectMaterial } from '../../../utils';
import { ActionEvent } from '@babylonjs/core/Actions/actionEvent';
import { MeshBase } from '../../../meshes';
import { setGuiEntryDetail } from './GuiEntryDetail';

class DayGaugeSegment extends MeshBase {
  private _entry: ITimesheet;
  private DEFAULT_OUTLINE_WIDTH = 0.03;

  public constructor(entry: ITimesheet, profile: IGaugeProfile) {
    super(`Record_${entry.TimesheetId}`);

    // Keep a reference to the entry
    this._entry = entry;

    const { Hours } = entry;
    const gauge = this.createGauge(entry, profile);

    this.addChild(gauge);
    this.addMouseInteractions(gauge);

    // Position the gauge so it pivot is at the Root
    gauge.locallyTranslate(new Vector3(0, Hours / 2, 0));
  }

  protected onPointerOver = (evt: ActionEvent) => {
    const gauge = evt.meshUnderPointer;
    gauge.outlineColor = Color3.White();
    gauge.outlineWidth = gauge.outlineWidth = this.DEFAULT_OUTLINE_WIDTH * 2;
    setGuiEntryDetail(this._entry);
  };

  protected onPointerOut = (evt: ActionEvent) => {
    const gauge = evt.meshUnderPointer;
    const { Charge } = this._entry;
    gauge.outlineColor = Charge === 'N/C' ? Color3.Red() : Color3.Green();
    gauge.outlineWidth = this.DEFAULT_OUTLINE_WIDTH;
    setGuiEntryDetail();
  };

  private createGauge = (entry: ITimesheet, profile: IGaugeProfile) => {
    const { Hours, ProjectId, Charge } = entry;
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

    return gauge;
  };
}

export default DayGaugeSegment;
