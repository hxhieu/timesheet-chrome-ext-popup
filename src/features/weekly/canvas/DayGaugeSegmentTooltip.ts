import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { MeshBase, UiLabel } from '../../../gui';
import { IGaugeProfile } from '../../../types';

// Singleton
let _instance: DayGaugeSegmentTooltip;
const instanceName = 'EntryTooltip';

class DayGaugeSegmentTooltip extends MeshBase {
  private _txtProject: UiLabel;
  public constructor(profile: IGaugeProfile) {
    super(instanceName, true);

    this._txtProject = new UiLabel(`tex_${instanceName}_project`, 'aaaa');

    const pane = this.createPane(profile);
    this.addChild(pane);
  }

  private createPane = (profile: IGaugeProfile) => {
    const { diameter } = profile;
    const pane = MeshBuilder.CreatePlane(`${instanceName}_Pane`, {
      height: 2,
      width: 1,
    });
    pane.locallyTranslate(new Vector3(0, 0, -diameter / 2 - 0.1));
    const material = new StandardMaterial('mat_entry_tooltip', pane.getScene());
    material.alpha = 1;
    material.specularColor = Color3.Black();
    material.specularPower = 0;
    material.diffuseColor = Color3.White();
    pane.material = material;

    return pane;
  };
}

const getSegmentTooltip = (): DayGaugeSegmentTooltip => {
  return _instance;
};

const createSegmentTooltip = (profile: IGaugeProfile) => {
  if (!_instance) {
    _instance = new DayGaugeSegmentTooltip(profile);
  }
  return _instance;
};

export { getSegmentTooltip, createSegmentTooltip };
