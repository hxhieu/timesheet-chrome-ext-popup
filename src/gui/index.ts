import { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture';
import { Control } from '@babylonjs/gui/2D/controls/control';

let _gui: FullScreenGui;

class FullScreenGui {
  private _tex: AdvancedDynamicTexture = AdvancedDynamicTexture.CreateFullscreenUI('GUI');
  private _ctx: CanvasRenderingContext2D;

  public addControl = (control: Control) => {
    this._tex.addControl(control);
    this._ctx = this._tex.getContext();
  };

  public measureText = (text: string, font?: string) => {
    if (font) {
      this._ctx.font = font;
    }
    return this._ctx.measureText(text).width;
  };
}

const createGui = (): FullScreenGui => {
  if (!_gui) {
    _gui = new FullScreenGui();
  }
  return _gui;
};

const getGui = () => _gui;

export { createGui, getGui };
