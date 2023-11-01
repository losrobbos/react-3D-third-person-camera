import { useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { BoxHelper, Mesh, Vector3 } from "three";
import { useInput } from "../hooks/useInput";
import { useCamera } from "../hooks/useCamera";

export const PlayerBox = ({ helper = false }: { helper?: boolean }) => {

  const refBox = useRef<Mesh>(null!)
  const { keysPressed } = useInput()

  useHelper(refBox, BoxHelper, "grey")
  const camera = useCamera()

  /**
   * TODO Apply movement by VECTOR (!) not by just single axis 
   * TODO this allows us to move in ALL dimensions, not just on one axis!
   * - first try to move by a unit vector on an axis
   * - then try to move by some fixed diagonal direction vector
   * - and finally: determine the direction vector from player object
   *   - how??? follows... :)
   */
  useFrame(() => {
    if (!refBox.current) return
    // refBox.current.rotation.x += 0.01

    const player = refBox.current

    // any key pressed?
    // if(Object.values(keysPressed).some(item => item)) {
    //   console.log(keysPressed)
    // }

    if (keysPressed.left || keysPressed.right) {
      player.rotation.y += keysPressed.left ? 0.03 : -0.03
    }
    
    // perform MOVEMENT in direction
    if (keysPressed.up || keysPressed.down) {
      const playerDirection = new Vector3()
      player.getWorldDirection(playerDirection)
      // move player position in accordance to current orientation (=world direction) 
      const acceleration = keysPressed.up ? - 0.05 : 0.05
      const playerShift = playerDirection.multiplyScalar(acceleration)
      player.position.add(playerShift)

      // move player accordingly
      camera.position.add(playerShift)
    }

    /**
     * MOVE camera
     * - if player rotated => rotate camera too!
     * - if player moved by direction => move camera by that direction too!
     */

  })

  return (
    <>
      <mesh ref={(helper || null) && refBox}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={"purple"} />
      </mesh>
    </>
  );
}