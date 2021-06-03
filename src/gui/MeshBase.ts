import '@babylonjs/core/Culling/ray';
import { ActionEvent } from '@babylonjs/core/Actions/actionEvent';
import { ActionManager } from '@babylonjs/core/Actions/actionManager';
import { ExecuteCodeAction } from '@babylonjs/core/Actions/directActions';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { Scene } from '@babylonjs/core/scene';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Angle } from '@babylonjs/core/Maths/math.path';

abstract class MeshBase {
  protected Mesh: Mesh;

  public get position(): Vector3 {
    return this.Mesh.position;
  }

  public setPosition = ({ x, y, z }: { x?: number; y?: number; z?: number } | Vector3) => {
    if (!this.Mesh) return;
    if (x !== undefined) this.Mesh.position.x = x;
    if (y !== undefined) this.Mesh.position.y = y;
    if (z !== undefined) this.Mesh.position.z = z;
  };

  public setParent = (parent: Mesh) => {
    if (!this.Mesh) return;
    this.Mesh.parent = parent;
  };

  public rotateEuler(axis: Vector3, euler: number) {
    this.Mesh.rotate(axis, Angle.FromDegrees(euler).radians());
  }

  public setRotation(rot: Vector3) {
    this.Mesh.rotation = rot.clone();
  }

  protected addMouseInteractions = (scene: Scene) => {
    if (!this.Mesh) {
      throw new Error('The Mesh is not initialised!');
    }
    this.Mesh.actionManager = new ActionManager(scene);
    this.Mesh.actionManager.registerAction(
      new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, this.onPointerOver),
    );
    this.Mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, this.onPointerOut));
  };

  protected onPointerOver = (evt: ActionEvent) => {};
  protected onPointerOut = (evt: ActionEvent) => {};
}

export { MeshBase };
