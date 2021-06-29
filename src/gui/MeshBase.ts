import '@babylonjs/core/Culling/ray';
import { nanoid } from 'nanoid';
import { ActionEvent } from '@babylonjs/core/Actions/actionEvent';
import { ActionManager } from '@babylonjs/core/Actions/actionManager';
import { ExecuteCodeAction } from '@babylonjs/core/Actions/directActions';
import { Mesh } from '@babylonjs/core/Meshes/mesh';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Angle } from '@babylonjs/core/Maths/math.path';
import { TransformNode } from '@babylonjs/core/Meshes/transformNode';
import { getEnv } from '../utils';

abstract class MeshBase {
  protected Root: TransformNode;

  public constructor(name?: string, debug?: boolean) {
    this.Root = new TransformNode(`${name || nanoid()}_Root`);
    const useDebug = debug || getEnv().babylonJsDebug === 'true';
    if (useDebug) {
      const box = MeshBuilder.CreateSphere(nanoid(), {
        diameter: 0.15,
      });
      this.addChild(box);
    }
  }

  public get position(): Vector3 {
    return this.Root.position;
  }

  public addChild = (node: TransformNode) => {
    node.parent = this.Root;
  };

  public setPosition = ({ x, y, z }: { x?: number; y?: number; z?: number } | Vector3) => {
    if (x !== undefined) this.Root.position.x = x;
    if (y !== undefined) this.Root.position.y = y;
    if (z !== undefined) this.Root.position.z = z;
  };

  public setParent = (parent: Mesh) => {
    this.Root.parent = parent;
  };

  public rotateEuler(axis: Vector3, euler: number) {
    this.Root.rotate(axis, Angle.FromDegrees(euler).radians());
  }

  public setRotation(rot: Vector3) {
    this.Root.rotation = rot.clone();
  }

  protected addMouseInteractions = (mesh: Mesh) => {
    mesh.actionManager = new ActionManager(this.Root.getScene());
    mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, this.onPointerOver));
    mesh.actionManager.registerAction(new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, this.onPointerOut));
  };

  protected onPointerOver = (evt: ActionEvent) => {};
  protected onPointerOut = (evt: ActionEvent) => {};
}

export { MeshBase };
