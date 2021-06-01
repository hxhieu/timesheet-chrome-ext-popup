import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { IGaugeProfile, ITimesheet } from '../../../types';

const createDayGaugeSegment = (entry: ITimesheet, profile: IGaugeProfile): Mesh => {
  const { Hours } = entry;
  const { diameter, segmentPadding } = profile;
  // 1 unit = 1 hour
  // Add some padding
  const height = Hours - segmentPadding * 2;
  let gauge = MeshBuilder.CreateCylinder(`entry_${entry.TimesheetId}`, {
    diameter: diameter * 0.7,
    height,
  });
  gauge.isPickable = false;

  return gauge;
};

export { createDayGaugeSegment };
