import { Mesh, Vector3 } from "three";

export const calcCameraOffsetNew = (player: Mesh) => {
  // camera should be slightly BEHIND player
  const offset = new Vector3(0, 2, -3)
  offset.applyQuaternion(player.quaternion);
  offset.add(player.position)
  return offset
}

export const calcCameraLookAtNew = (player: Mesh) => {
  // camera should look slightly BEYOND player
  const lookAt = new Vector3(0, 1, 5)
  lookAt.applyQuaternion(player.quaternion);
  lookAt.add(player.position)
  return lookAt
}

