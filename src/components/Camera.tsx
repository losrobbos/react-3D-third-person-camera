import { useFrame, useThree } from "@react-three/fiber"
import { useInput } from "../hooks/useInput"

export const Camera = () => {

  // const { keysPressed } = useInput()
  // const camera = useCamera()

  // rotate camera around center!
  // useFrame(() => {
  //   if(keysPressed.left) {
  //     camera.rotation.y += 0.05;
  //   }
  //   else if(keysPressed.right) {
  //     camera.rotation.y -= 0.05;
  //   }
  // })

  return null;
}

export const useCamera = () => {
  return useThree(state => state.camera)
}