import { useHelper } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { BoxHelper, Mesh } from "three"

type Props = {
  helper?: boolean
}

export const RingOfFire = ({ helper = false }: Props) => {
  const ref = useRef<Mesh>(null!)

  useHelper(helper && ref, BoxHelper, "orange")

  useFrame(() => {
    if (!ref.current) return
    ref.current.rotation.y += 0.01
  })

  return (
    <mesh ref={ref} name="RingOfFire"  position={[-3.5, 1.3, -3.5]} castShadow receiveShadow>
      <torusGeometry args={[1, 0.1]} />
      <meshStandardMaterial color={[0.8, 0.8, 0.4]} />
    </mesh>
  )
}