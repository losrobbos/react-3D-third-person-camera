import { useHelper } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { BoxHelper, Mesh } from "three";

export const PlayerBox = ({ helper = false }: { helper?: boolean }) => {

  const refBox = useRef<Mesh>(null!)
  const camera = useThree((state) => state.camera)

  useHelper(refBox, BoxHelper, "grey")

  useFrame(() => {
    if(!refBox.current) return
    refBox.current.rotation.x += 0.01
  })

  return (
    <mesh ref={(helper || null ) && refBox}>
      <boxGeometry args={[1,1,1]} />
      <meshStandardMaterial color={"purple"} />
    </mesh>
  );
}