import { useGLTF } from "@react-three/drei"
import { ThreeElements } from "@react-three/fiber"
import { useMemo, useState } from "react"
import { Quaternion } from "three"

const mapInitial = [
  '             ',
  '  *        * ',
  '   *      *  ',
  '             ',
  '             ',
  '   *      *  ',
  '  *        * ',
  '             ',
]

const map2Dim = mapInitial.map(row => {
  return row.split("")
})

export const Trees = () => {

  const [map, setMap] = useState(map2Dim)

  const model = useGLTF("models/birch_tree.glb")
  // const model = useGLTF("models/laurel_tree.glb")

  // extract trees from map
  // create model meshes from trees
  // use row & col for positioning 
  const trees = useMemo(() => {
    const jsxTreesList: Array<any> = []
    const treeModels = model.scene.children[0].children[0].children
    console.log(treeModels)
    // todo: onload => create model INSTANCES from loaded model
    // and place them in scene (everywhere where * char is)
    map.forEach((row, r) => {
      row.forEach((col, c) => {
        if (col !== "*") return
        // todo: create instance

        const instance = treeModels[0].clone(true)
        instance.scale.set(0.2,0.2,0.2)
        instance.position.set(c-4,0,r-4)
        // rotate around X / Z axis
        instance.rotateX(-Math.PI/2)
        // instance.applyQuaternion(new Quaternion().setFromEuler())
        console.log({ r,c })
        // instance.scale.set(0.005,0.005,0.005)
        jsxTreesList.push(<primitive key={instance.uuid} object={instance} />)
      })
    })
    console.log("Trees: ", jsxTreesList.length)
    return jsxTreesList
  }, [map])


  return <group name="forrest">
    {trees}
  </group>
}

useGLTF.preload("models/birch_tree.glb")