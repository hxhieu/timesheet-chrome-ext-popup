import * as pc from 'playcanvas';

const createMousePickScript = (app?: pc.Application) => {
  pc.createScript('mousePick', app).extend({
    initialize: function () {
      const { entity } = this as pc.ScriptType;
      app.mouse.on(pc.EVENT_MOUSEMOVE, () => {});
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
