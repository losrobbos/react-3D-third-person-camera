import { useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { BoxHelper, Mesh, Quaternion, Vector3 } from "three";
import { useInput } from "../hooks/useInput";
import { useCamera } from "../hooks/useCamera";

export const PlayerBox = ({ helper = false }: { helper?: boolean }) => {

  const refBox = useRef<Mesh>(null!)
  const { keysPressed } = useInput()

  useHelper(helper && refBox, BoxHelper, "grey")
  const camera = useCamera()

  useFrame(() => {
    if (!refBox.current) return
    // refBox.current.rotation.x += 0.01

    const player = refBox.current

    // any key pressed?
    // if(Object.values(keysPressed).some(item => item)) {
    //   console.log(keysPressed)
    // }

    if (keysPressed.left || keysPressed.right) {
      const rotationShift = keysPressed.left ? 0.03 : -0.03
      // player.rotation.y += rotationShift
      // camera.rotation.y += rotationShift

      // determine rotation quaternion
      const q = new Quaternion()
      q.setFromAxisAngle(new Vector3(0,1,0).normalize(), rotationShift)

      // rotate player
      player.applyQuaternion(q)

      // refocus player after doing position shift!
      camera.lookAt(player.position)

      // rotate camera position by the same angle
      // camera.position.applyQuaternion(q)
      // TODO: rotate POSIION of camera around object! (using same rotation quaternion!)

    }

    // perform MOVEMENT in direction
    if (keysPressed.up || keysPressed.down) {
      const playerDirection = new Vector3()
      
      player.getWorldDirection(playerDirection)
      // move player position in accordance to current orientation (=world direction) 
      const acceleration = keysPressed.up ? - 0.05 : 0.05
      const positionShift = playerDirection.multiplyScalar(acceleration)
      player.position.add(positionShift)

      // move camera accordingly in same direction as player
      camera.position.add(positionShift)
      camera.lookAt(player.position)      
      
      // const cameraOffset = new Vector3(0, 1, 3) // fixed distance from player
      // const camTarget = new Vector3() 
      // player.getWorldPosition(camTarget)
      // camTarget.add(cameraOffset)
      // camera.lookAt(camTarget)
    }

    /**
     * MOVE camera
     * - if player rotated => rotate camera too!
     * - if player moved by direction => move camera by that direction too!
     */

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