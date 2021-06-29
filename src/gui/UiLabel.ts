import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { MeshBase } from './MeshBase';
import { DynamicTexture } from '@babylonjs/core/Materials/Textures/dynamicTexture';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { Color3 } from '@babylonjs/core/Maths/math.color';

class UiLabel extends MeshBase {
  public constructor(
    name: string,
    text: string,
    colour = 'white',
    fontWeight = 'normal',
    fontSize = 12,
    fontFace = 'Arial',
  ) {
    super(name);

    const fontStyle = `${fontWeight} ${fontSize}px ${fontFace}`;
    // Create a temp context to calculate the sizes
    const tmpCtx = new DynamicTexture(`${name}_tex_tmp`, 32, this.scene).getContext();
    tmpCtx.font = fontStyle;
    const dtWidth = tmpCtx.measureText(text).width;
    const dtHeight = fontSize;

    const planeHeight = fontSize / 48; // For good looking
    const ratio = planeHeight / dtHeight;
    const planeWidth = dtWidth * ratio;

    const tex = new DynamicTexture(
      `${name}_tex`,
      {
        width: dtWidth,
        height: dtHeight,
      },
      this.scene,
    );
    tex.hasAlpha = true;

    const mat = new StandardMaterial(`${name}_mat`, this.scene);
    mat.backFaceCulling = false;
    mat.diffuseColor = Color3.Black();
    mat.specularColor = Color3.Black();

    mat.emissiveTexture = tex;
    mat.opacityTexture = tex;

    tex.drawText(text, 0, null, fontStyle, colour, 'transparent');

    const label = MeshBuilder.CreatePlane(name, {
      width: planeWidth,
      height: planeHeight,
    });

    label.material = mat;

    this.addChild(label);
  }
}

export { UiLabel };
