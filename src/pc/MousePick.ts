const createMousePickScript = (app?: pc.Application) => {
  pc.createScript('mousePick', app).extend({
    initialize: function () {
      const { entity } = this as pc.ScriptType;
      const cameraEntity = app.root.findByName('camera') as pc.Entity;
      const camera = cameraEntity.findComponent('camera') as pc.CameraComponent;
      const physics: pc.RigidBodyComponentSystem = (app.systems as any).rigidbody;
      app.mouse.on(pc.EVENT_MOUSEMOVE, (e: pc.MouseEvent) => {
        const from = camera.screenToWorld(e.x, e.y, camera.nearClip);
        const to = camera.screenToWorld(e.x, e.y, camera.farClip);

        // console.log(from);

        const result = physics.raycastFirst(from, to);
        if (result) {
          console.log(result.entity.name);
        }
      });
    },
    update: function (dt) {
      // called each tick
    },
  });
};

export { createMousePickScript };

// MousePick.prototype.onSelect = function (e) {
//   let from = this.entity.camera.screenToWorld(e.x, e.y, this.entity.camera.nearClip);
//   let to = this.entity.camera.screenToWorld(e.x, e.y, this.entity.camera.farClip);

//   let result = this.app.systems.rigidbody.raycastFirst(from, to);
//   if (result) {
//     let pickedEntity = result.entity;
//     pickedEntity.script.pulse.pulse();
//   }
// };
