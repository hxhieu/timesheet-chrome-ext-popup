import '@babylonjs/core/Rendering/outlineRenderer';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { Angle } from '@babylonjs/core/Maths/math.path';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { IGaugeProfile, ITimesheet } from '../../../types';
import { getProjectMaterial } from '../../../utils';
import { toHourNumber } from '../../../utils/date';
import { ActionManager } from '@babylonjs/core/Actions/actionManager';
import { ExecuteCodeAction } from '@babylonjs/core/Actions/directActions';
import { scene } from './Scene';

const createDayGaugeSegment = (entry: ITimesheet, profile: IGaugeProfile): Mesh => {
  const { Hours, StartText, ProjectId, Charge } = entry;
  const { diameter, segmentPadding } = profile;
  // 1 unit = 1 hour
  // Add some padding
  const height = Hours - segmentPadding * 2;
  let gauge = MeshBuilder.CreateCylinder(`entry_${entry.TimesheetId}`, {
    diameter: diameter * 0.7,
    height: height,
  });
  gauge.isPickable = true;
  gauge.material = getProjectMaterial(ProjectId);

  // Charge vs N/C
  gauge.renderOutline = true;
  gauge.outlineColor = Charge === 'N/C' ? Color3.Red() : Color3.Green();
  gauge.outlineWidth = 0.04;

  // Transform
  gauge.rotate(Vector3.Forward(), Angle.FromDegrees(90).radians());
  gauge.position.x = -toHourNumber(StartText) - Hours / 2;

  // Mouse action
  gauge.actionManager = new ActionManager(scene);
  gauge.actionManager.registerAction(
    new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, (evt) => {
      console.log(gauge.name);
    }),
  );

  return gauge;
};

export { createDayGaugeSegment };
