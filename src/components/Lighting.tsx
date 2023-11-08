import { CameraHelper, DirectionalLight, DirectionalLightHelper, Vector3 } from 'three'
import { useEffect, useRef } from 'react'
import { useHelper } from '@react-three/drei'

type Props = {
  helper?: boolean
  position?: [number, number, number]
}

const target = new Vector3(4,0,4)

export const Lighting = ({ position = [4, 4, 1], helper = false }: Props) => {
  const refDirLight = useRef<DirectionalLight>(null!)

  // light helper to visualize source / origin of light
  useHelper(refDirLight, DirectionalLightHelper, 1, "purple")

  // on load => position direction of light
  // useEffect(() => {
  //   console.log(refDirLight.current)
  //   refDirLight.current.lookAt(target)
  // }, [])

  return <>
    <ambientLight />
    <directionalLight
      position={position}
      ref={(helper || null) && refDirLight}
      color={"white"}
      intensity={5}
      castShadow
    />
  </>
}

