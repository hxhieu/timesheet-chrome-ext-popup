import { Angle } from '@babylonjs/core/Maths/math.path';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { IGaugeProfile, ITimesheet } from '../../../types';
import { getProjectMaterial, materialCache } from '../../../utils';
import { toHourNumber } from '../../../utils/date';

const createDayGaugeSegment = (entry: ITimesheet, profile: IGaugeProfile): Mesh => {
  const { Hours, StartText, ProjectId, Charge } = entry;
  const { diameter, segmentPadding } = profile;
  // 1 unit = 1 hour
  // Add some padding
  const height = Hours - segmentPadding * 2;
  const gauge = MeshBuilder.CreateCylinder(`entry_${entry.TimesheetId}`, {
    diameter: diameter * 0.8,
    height: height,
  });
  gauge.isPickable = false;
  gauge.material = getProjectMaterial(ProjectId);

  // Charge vs N/C
  const outline = MeshBuilder.CreateCylinder(`entry_${entry.TimesheetId}`, {
    diameter: diameter,
    height: Hours,
    sideOrientation: 1,
  });
  outline.parent = gauge;
  outline.material = Charge === 'N/C' ? materialCache.nonCharge : materialCache.charge;

  // Transform
  gauge.rotate(Vector3.Forward(), Angle.FromDegrees(90).radians());
  gauge.position.x = -toHourNumber(StartText) - Hours / 2;

  return gauge;
};

export { createDayGaugeSegment };
