import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { TextBlock } from '@babylonjs/gui/2D/controls/textBlock';
import { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture';
import { MeshBase } from './MeshBase';

class UiLabel extends MeshBase {
  private _textBlock: TextBlock;
  public constructor(name: string, text: string, colour = 'white', fontSize = 100, planeSize = 4) {
    super();
    this.Mesh = MeshBuilder.CreatePlane(name, {
      size: planeSize,
    });
    // Flip around X to use LH coordinate system
    this.Mesh.scaling.set(-1, 1, 1);
    const advancedTexture = AdvancedDynamicTexture.CreateForMesh(this.Mesh);

    this._textBlock = new TextBlock(`${this.Mesh.name}_text`, text);
    this._textBlock.fontSize = fontSize;
    this._textBlock.color = colour;
    advancedTexture.addControl(this._textBlock);
  }

  public setColour = (colour: string) => {
    this._textBlock.color = colour;
  };

  public setWeight = (weight: 'normal' | 'bold') => {
    this._textBlock.fontWeight = weight;
  };
}

export { UiLabel };
