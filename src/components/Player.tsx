import { useThree } from "@react-three/fiber"

export const Player = () => {
  const camera = useThree((state) => state.camera)

  return (
    <mesh>
      <torusGeometry />
      <meshStandardMaterial color={"orange"} />
    </mesh>
  )
}