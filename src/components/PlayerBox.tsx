import { useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { BoxHelper, Mesh, Vector3 } from "three";
import { useInput } from "../hooks/useInput";
import { Testing } from "./Testing";

export const PlayerBox = ({ helper = false }: { helper?: boolean }) => {

  const refBox = useRef<Mesh>(null!)
  const { keysPressed } = useInput()

  useHelper(refBox, BoxHelper, "grey")

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

    if (keysPressed.left) {
      player.rotation.y += 0.03
    }
    else if (keysPressed.right) {
      player.rotation.y -= 0.03
    }
    if (keysPressed.up) {
      player.position.z -= 0.01
      // TODO: calculate new position in X / Z space
      // we need to consider current rotation
      // from that we must derive a VECTOR
      // and then move the player in the direction of that vector!
    }
    else if (keysPressed.down) {
      player.position.z += 0.01
    }


    // after all rotations are done 
    // check MOVEMENT
    if (keysPressed.space) {
      // console.log("Space pressed...")
      const playerDirection = new Vector3()
      player.getWorldDirection(playerDirection)
      // console.log("- Player Pos: ", player.position)
      // console.log("- Direction", playerDirection)
      // move player position in accordance to current orientation (=world direction) 
      const acceleration = 0.05
      player.position.add(playerDirection.multiplyScalar(acceleration))
    }


  })

  return (
    <>
      <mesh ref={(helper || null) && refBox}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={"purple"} />
      </mesh>
      <Testing player={refBox} />
    </>
  );
}