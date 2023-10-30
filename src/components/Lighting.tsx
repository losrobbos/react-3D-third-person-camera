import { DirectionalLight, DirectionalLightHelper } from 'three'
import { useRef } from 'react'
import { useHelper } from '@react-three/drei'

export const Lighting = ({ helper = false }: { helper?: boolean }) => {
  const refDirLight = useRef<DirectionalLight>(null!)

  useHelper(refDirLight, DirectionalLightHelper, 1, "purple")

  return <>
    <ambientLight />
    <directionalLight ref={(helper || null) && refDirLight} color={"white"} intensity={10} position={[5, 0, -5]} />
  </>
}

