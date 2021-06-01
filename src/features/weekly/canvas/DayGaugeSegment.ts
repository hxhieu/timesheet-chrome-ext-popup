import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { IGaugeProfile, ITimesheet } from '../../../types';
import { toHourNumber } from '../../../utils/date';

const createDayGaugeSegment = (entry: ITimesheet, profile: IGaugeProfile): Mesh => {
  const { Hours, StartText, EndText } = entry;
  const { diameter, segmentPadding } = profile;
  const startHour = toHourNumber(StartText);
  // 1 unit = 1 hour
  // Add some padding
  const height = Hours - segmentPadding * 2;
  let gauge = MeshBuilder.CreateCylinder(`entry_${entry.TimesheetId}`, {
    diameter: diameter * 0.8,
    height,
  });
  gauge.isPickable = true;
  gauge.position.y = -startHour + Hours / 2;

  return gauge;
};

export { createDayGaugeSegment };
