import { useThree } from "@react-three/fiber"

export const useCamera = () => {
  return useThree(state => state.camera)
}