import { DirectionalLight, DirectionalLightHelper } from 'three'
import { useRef } from 'react'
import { useHelper } from '@react-three/drei'

export const Lighting = ({ helper = false }: { helper?: boolean }) => {
  const refDirLight = useRef<DirectionalLight>(null!)

  useHelper(refDirLight, DirectionalLightHelper, 1, "purple")

  return <>
    <ambientLight />
    <directionalLight
      castShadow
      ref={(helper || null) && refDirLight} 
      color={"white"} 
      intensity={5} 
      position={[4, 3, -4]} 
    />
  </>
}

