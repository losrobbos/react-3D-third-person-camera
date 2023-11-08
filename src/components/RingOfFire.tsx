import { useHelper } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Box3, BoxHelper, Mesh } from "three"

type Props = {
  position?: [number, number, number]
  helper?: boolean
}

export const RingOfFire = ({ position = [-3.5, 1.3, -3.5], helper = false }: Props) => {
  const ref = useRef<Mesh>(null!)

  // show bounding box of torus
  useHelper(helper && ref, BoxHelper, "orange")

  // set up bounding box
  useEffect(() => {
    if (!ref.current) return
    const torus = ref.current

    // create bounding box
    const bb = new Box3()
    // determine current size of object and copy it over to bounding box 
    torus.geometry.computeBoundingBox()
    torus.userData.boundingBox = bb
  }, [])

  // rotate, baby!
  // + update bounding box!
  useFrame(() => {
    if (!ref.current) return
    const torus = ref.current
    torus.rotation.y += 0.01
    // torus.position.x += 0.01

    // update bounding box
    if (!torus.geometry.boundingBox) return
    if (!torus.userData.boundingBox) return
    const torusBB = torus.userData.boundingBox as Box3
    // set bounding box with mesh / object size
    torusBB.copy(torus.geometry.boundingBox)
    // apply the same position & rotation from object to bounding box!
    // so they update in sync
    torusBB.applyMatrix4(torus.matrixWorld)
  })

  return (
    <mesh ref={ref} name="RingOfFire" position={position} castShadow receiveShadow>
      <torusGeometry args={[1, 0.1]} />
      <meshStandardMaterial color={[0.8, 0.8, 0.4]} />
    </mesh>
  )
}