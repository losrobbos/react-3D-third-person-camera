import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Mesh } from "three"

export const RingOfFire = () => {
  const ref = useRef<Mesh>(null)

  useFrame(() => {
    if(!ref.current) return
    ref.current.rotation.y += 0.01
  })

  return (
    <mesh ref={ref} position={[-3.5, 1.3, -3.5]} castShadow receiveShadow>
      <torusGeometry args={[1, 0.1]}/>
      <meshStandardMaterial color={"orange"} />
    </mesh>
  )
}