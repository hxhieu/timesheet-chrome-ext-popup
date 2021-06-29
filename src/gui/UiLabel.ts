import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { TextBlock } from '@babylonjs/gui/2D/controls/textBlock';
import { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture';
import { MeshBase } from './MeshBase';

class UiLabel extends MeshBase {
  private _textBlock: TextBlock;
  public constructor(name: string, text: string, colour = 'white', fontSize = 100, planeSize = 4) {
    super(name);
    const label = MeshBuilder.CreatePlane(name, {
      size: planeSize,
    });
    const advancedTexture = AdvancedDynamicTexture.CreateForMesh(label);

    this._textBlock = new TextBlock(`${label.name}_text`, text);
    this._textBlock.fontSize = fontSize;
    this._textBlock.color = colour;
    advancedTexture.addControl(this._textBlock);

    this.addChild(label);
  }

  public setColour = (colour: string) => {
    this._textBlock.color = colour;
  };

  public setWeight = (weight: 'normal' | 'bold') => {
    this._textBlock.fontWeight = weight;
  };
}

export { UiLabel };
