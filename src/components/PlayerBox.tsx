import { useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { BoxHelper, Mesh, Quaternion, Vector3 } from "three";
import { useInput } from "../hooks/useInput";
import { useCamera } from "../hooks/useCamera";

export const PlayerBox = ({ helper = false }: { helper?: boolean }) => {

  const refBox = useRef<Mesh>(null!)
  const camera = useCamera()
  const { keysPressed } = useInput()

  useHelper(helper && refBox, BoxHelper, "grey")

  const calcCameraOffsetNew = (player: Mesh) => {
    // camera should be slightly BEHIND player
    const offset = new Vector3(0,2,3)
    offset.applyQuaternion(player.quaternion) ;
    offset.add(player.position)
    return offset
  }

  const calcCameraLookAtNew = (player: Mesh) => {
    // camera should look slightly BEYOND player
    const lookAt = new Vector3(0,0,-5)
    lookAt.applyQuaternion(player.quaternion);
    lookAt.add(player.position)
    return lookAt
  }

  // set initial camera position
  useEffect(() => {
    if (!refBox.current) return
    const player = refBox.current
    camera.position.copy(calcCameraOffsetNew(player))
    camera.lookAt(calcCameraLookAtNew(player))
  }, [])

  useFrame(() => {
    if (!refBox.current) return
    const player = refBox.current

    // any key pressed?
    // if(Object.values(keysPressed).some(item => item)) {
    //   console.log(keysPressed)
    // }

    if (keysPressed.left || keysPressed.right) {
      const rotationShift = keysPressed.left ? 0.03 : -0.03

      // determine rotation as quaternion
      const q = new Quaternion()
      q.setFromAxisAngle(new Vector3(0,1,0).normalize(), rotationShift)

      // rotate player by given angle
      player.applyQuaternion(q)

    }

    // perform MOVEMENT in direction
    if (keysPressed.up || keysPressed.down) {
      const playerDirection = new Vector3()
      
      player.getWorldDirection(playerDirection)
      const acceleration = keysPressed.up ? - 0.05 : 0.05
      // move player position in accordance to current orientation (=world direction) 
      const positionShift = playerDirection.multiplyScalar(acceleration)
      player.position.add(positionShift)

    }

    // move camera
    if (keysPressed.left || keysPressed.right || keysPressed.up || keysPressed.down) {
      // calculate new POSITION
      camera.position.copy(calcCameraOffsetNew(player))
      // calculate new LOOK AT position
      camera.lookAt(calcCameraLookAtNew(player))
    }

  })

  return (
    <>
      <mesh ref={refBox}>
        <boxGeometry args={[1, 1, 1]} />
        {/* <meshStandardMaterial color={"purple"} /> */}
        <meshStandardMaterial attach="material-0" color="purple" />
        <meshStandardMaterial attach="material-1" color="purple" />
        <meshStandardMaterial attach="material-2" color="purple" />
        <meshStandardMaterial attach="material-3" color="purple" />
        <meshStandardMaterial attach="material-4" color="purple" />
        {/* last material is the one facing in FRONT direction */}
        <meshStandardMaterial attach="material-5" color="red" />
      </mesh>
    </>
  );
}