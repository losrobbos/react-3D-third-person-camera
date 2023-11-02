import { useGLTF, useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { BoxHelper, Mesh, Quaternion, Vector3 } from "three";
import { useInput } from "../hooks/useInput";
import { useCamera } from "../hooks/useCamera";
import { calcCameraLookAtNew, calcCameraOffsetNew } from "../utils/utils";

export const PlayerBox = ({ helper = false }: { helper?: boolean }) => {

  const refPlayer = useRef<Mesh>(null!)
  const camera = useCamera()
  const { keysPressed } = useInput()
  const { nodes } = useGLTF("./models/robot.glb") as any
  const model = nodes["RootNode"] // "RobotArmature"

  // useHelper(helper && refPlayer, BoxHelper, "grey")

  // set initial camera position
  useEffect(() => {
    if (!refPlayer.current) return
    const player = refPlayer.current

    player.scale.set(0.3,0.3,0.3)

    // position camera to view in player direction (= see world sneeking "behind players shoulder")
    camera.position.copy(calcCameraOffsetNew(player))
    camera.lookAt(calcCameraLookAtNew(player))
  }, [])

  useFrame(() => {
    if (!refPlayer.current) return
    const player = refPlayer.current

    if (keysPressed.left || keysPressed.right) {
      const rotationShift = keysPressed.left ? 0.03 : -0.03

      // determine rotation as quaternion
      const q = new Quaternion()
      q.setFromAxisAngle(new Vector3(0, 1, 0).normalize(), rotationShift)

      // rotate player by given angle
      player.applyQuaternion(q)

      // calculate new camera POSITION
      camera.position.copy(calcCameraOffsetNew(player))
      // calculate new LOOK AT position (only needed on player rotation)
      camera.lookAt(calcCameraLookAtNew(player))
    }

    // perform MOVEMENT in direction
    if (keysPressed.up || keysPressed.down) {
      const playerDirection = new Vector3()

      player.getWorldDirection(playerDirection)
      const acceleration = keysPressed.up ? 0.05 : -0.05
      // move player position in accordance to current orientation (=world direction) 
      // therefore we multiply the current DIRECTION vector by some reasonable value of "acceleration"
      // that value will simply determine, how much space forward / backward the character moves on a keystroke
      // the higher the value => the bigger the move
      const positionShift = playerDirection.multiplyScalar(acceleration)
      player.position.add(positionShift)

      // calculate new camera POSITION
      camera.position.copy(calcCameraOffsetNew(player))
    }

  })

  return (
    <>
      <object3D ref={refPlayer} >
        {/* player mesh object is nested one level inside scene */}
        <primitive object={model} />
      </object3D>
    </>
  );
}

useGLTF.preload("./models/robot.glb")