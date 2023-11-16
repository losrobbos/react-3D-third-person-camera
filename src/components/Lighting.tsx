import { DirectionalLight, DirectionalLightHelper } from 'three'
import { useEffect, useRef } from 'react'
import { useHelper } from '@react-three/drei'

type Props = {
  helper?: boolean
  position?: [number, number, number]
}

// const target = new Vector3(4,0,4)

export const Lighting = ({ position = [5, 5, 10], helper = false }: Props) => {
  const refDirLight = useRef<DirectionalLight>(null!)

  // light helper to visualize source / origin of light
  // useHelper(refDirLight, DirectionalLightHelper, 1, "purple")

  // increase shadow frustum (=> area that receives shadows!)
  useEffect(() => {
    if(!refDirLight.current) return
    refDirLight.current.shadow.camera.top = 30
    refDirLight.current.shadow.camera.bottom = -30
    refDirLight.current.shadow.camera.left  = -30
    refDirLight.current.shadow.camera.right  = 30
  }, [])

  // on load => position direction of light
  // useEffect(() => {
  //   console.log(refDirLight.current)
  //   refDirLight.current.lookAt(target)
  // }, [])

  return <>
    <ambientLight />
    <directionalLight
      position={position}
      ref={refDirLight}
      color={"white"}
      intensity={5}
      castShadow
    />
  </>
}

