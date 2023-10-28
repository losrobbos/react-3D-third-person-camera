import { DirectionalLight, DirectionalLightHelper } from 'three'
import { useRef } from 'react'
import { useHelper } from '@react-three/drei'

export const Lighting = () => {
  const refDirLight = useRef<DirectionalLight>(null!)

  useHelper(refDirLight, DirectionalLightHelper, 1, "cyan")

  return <>
    <ambientLight />
    <directionalLight ref={refDirLight} color={"white"} intensity={5} position={[1, 1, 5]} />
  </>
}

