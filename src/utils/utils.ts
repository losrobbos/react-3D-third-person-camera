import { Box3, Mesh, Object3D, Vector3 } from "three";
import { OBB } from "three/addons/math/OBB.js";

export const setModelBoundingBox = (model: Object3D, debug = false) => {
  const modelBB = new Box3().setFromObject(model, true);
  const modelOBB = new OBB().fromBox3(modelBB)
  if(debug) {
    console.log("--PlayerBB Size: ", modelBB.getSize(new Vector3()));
    console.log("--PlayerBB  Center: ", modelBB.getCenter(new Vector3()));
  }
  model.userData.boundingBox = modelBB;
  model.userData.obb = modelOBB
  return model;
};

export const updateModelBoundingBox = (model: Object3D) => {
    // if (model.userData.obb) {
    //   const obb = model.userData.obb as OBB;
    //   obb.setFromObject(model, true);
    //   obb.applyMatrix4(model.matrixWorld);
    // }
    if (model.userData.boundingBox) {
      const bb = model.userData.boundingBox as Box3;
      bb.setFromObject(model, true);
      bb.applyMatrix4(model.matrixWorld);
    }

}

export const calcCameraOffsetNew = (player: Mesh) => {
  // camera should be slightly BEHIND player
  const offset = new Vector3(0, 2, -3);
  offset.applyQuaternion(player.quaternion);
  offset.add(player.position);
  return offset;
};

export const calcCameraLookAtNew = (player: Mesh) => {
  // camera should look slightly BEYOND player
  const lookAt = new Vector3(0, 1, 5);
  lookAt.applyQuaternion(player.quaternion);
  lookAt.add(player.position);
  return lookAt;
};
