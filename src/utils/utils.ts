import { BoxHelper, Mesh, Object3D, Vector3 } from "three";

export const setModelBoundingBox = (modelOrig: Object3D, modelHelper: Object3D, size: Vector3, debug = false) => {

  const helper = new BoxHelper(modelHelper);
  helper.geometry.computeBoundingBox();
  modelOrig.userData.boundingBox = helper.geometry.boundingBox;
  if(debug) {
    console.log("--PlayerHELPER Size:", helper.geometry.boundingBox?.getSize(size));
  }
  return modelOrig;
};

export const updateModelBoundingBox = (modelOrig: Object3D, modelHelper: Object3D) => {
  // use HELPER Bounding box instead of model bounding box
  // way more accurate!
  const helper = new BoxHelper(modelHelper);
  helper.geometry.computeBoundingBox();
  modelOrig.userData.boundingBox = helper.geometry.boundingBox
  // modelOrig.userData.boundingBox.applyMatrix4(modelHelper.matrixWorld)
}

export const calcCameraOffsetNew = (player: Mesh) => {
  // camera should be slightly BEHIND player
  // const offset = new Vector3(0, 2, -3);
  const offset = new Vector3(0, 2, -4);
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
