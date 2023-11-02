import { BufferGeometry, Material, Mesh, NormalBufferAttributes, Object3DEventMap } from "three"

interface Props {
  player: React.MutableRefObject<Mesh<BufferGeometry<NormalBufferAttributes>, Material | Material[], Object3DEventMap>>
}

export const Testing = ({ player}: Props) => {

  console.log(player)

  // const vUnit = new Vector3(1,0,1)

  // console.log("[1,0,1]", "normalized:" , new Vector3(1,0,1).normalize())
  // console.log("[2,0,2]", "normalized:" , new Vector3(2,0,2).normalize())
  // console.log("[3,0,3]", "normalized:" , new Vector3(3,0,3).normalize())

  
  // if (player.current) {
  //   console.log(vUnit)
  //   const quat = new Quaternion()
  //   // quat.setFromEuler(player.current.rotation)
  //   quat.setFromAxisAngle(vUnit.normalize(), Math.PI / 2) // 90 degree rotation
  //   vUnit.applyQuaternion(quat)
  //   console.log(vUnit)
  // }

  // const v1 = new Vector3(1, 2, 3)
  // const v2 = new Vector3()
  // console.log(v1, v2)
  // v2.copy(v1)
  // console.log(v1, v2)

  // console.log(vUnit)
  // vUnit.multiplyScalar(2)
  // console.log(vUnit)
  // vUnit.add(v1)
  // console.log(vUnit)


  return null
}