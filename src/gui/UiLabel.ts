import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { TextBlock } from '@babylonjs/gui/2D/controls/textBlock';
import { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture';
import { Angle, Vector3 } from '@babylonjs/core/Maths/math';

class UiLabel {
  private _label: Mesh;
  private _textBlock: TextBlock;
  public constructor(name: string, text: string, colour = 'white', fontSize = 100, planeSize = 4) {
    this._label = MeshBuilder.CreatePlane(name, {
      size: planeSize,
    });
    // Flip around X to use LH coordinate system
    this._label.scaling.set(-1, 1, 1);
    const advancedTexture = AdvancedDynamicTexture.CreateForMesh(this._label);

    this._textBlock = new TextBlock(`${this._label.name}_text`, text);
    this._textBlock.fontSize = fontSize;
    this._textBlock.color = colour;
    advancedTexture.addControl(this._textBlock);
  }

  public get position(): Vector3 {
    return this._label.position;
  }

  public setColour(colour: string) {
    this._textBlock.color = colour;
  }

  public setWeight(weight: 'normal' | 'bold') {
    this._textBlock.fontWeight = weight;
  }

  public setPosition(pos: Vector3) {
    this._label.position = pos;
  }

  public setParent(parent: Mesh) {
    parent.addChild(this._label);
  }

  public rotateEuler(axis: Vector3, euler: number) {
    this._label.rotate(axis, Angle.FromDegrees(euler).radians());
  }

  public setRotation(rot: Vector3) {
    this._label.rotation = rot.clone();
  }
}

export { UiLabel };
