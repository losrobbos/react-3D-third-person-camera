import { useGLTF } from "@react-three/drei"
import { useMemo, useState } from "react"
import { Mesh } from "three"

const mapInitial = [
  '      * *    ',
  '           * ',
  '             ',
  '             ',
  '             ',
  '             ',
  '*            ',
  '             ',
  '*         *  ',
  ' *         * ',
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
    const treeModel = treeModels[0]

    treeModel.traverse((obj) => {
      if (obj instanceof Mesh) {
        obj.castShadow = true;
      }
    })
    
    // onload => create model INSTANCES from loaded model
    // and place them in scene (everywhere where * char is)
    map.forEach((row, r) => {
      row.forEach((col, c) => {
        // ignore non tree cells
        if (col !== "*") return



        // create instance
        // console.log({ r,c })
        const instance = treeModel.clone(true)
        instance.scale.set(0.2,0.2,0.2)
        instance.position.set(c-4,0,r-4)
        // rotate around X axis to "lift up"
        
        // rotate each item random slightly around Y axis 
        // makes scene more unique)
        instance.rotateY(-Math.PI/ (Math.floor(Math.random()*10)) )
        instance.rotateX(-Math.PI/2)


        // instance.applyQuaternion(new Quaternion().setFromEuler())

        // primite tags can be collected in array too!
        jsxTreesList.push(<primitive key={instance.uuid} object={instance} />)
      })
    })
    return jsxTreesList
  }, [map]) // update trees if map changes

  return <group name="forest">
    {trees}
  </group>
}

useGLTF.preload("models/birch_tree.glb")