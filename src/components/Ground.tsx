import { useEffect, useRef } from "react"
import { DoubleSide, Mesh } from "three"

export const Ground = ({ width = 16, height = 16 }) => {

  const ref = useRef<Mesh>(null)

  useEffect(() => {
    if (!ref.current) return
    const ground = ref.current;

    ground.rotation.x = Math.PI / 2
  }, [])

  return (
    <mesh ref={ref} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[width, height, 20, 20]} />
      <meshStandardMaterial color={"purple"} side={DoubleSide} />
    </mesh>
  )
}