import { GLTF } from "three-stdlib";

export type GLTFResult = GLTF & {
  nodes: {
    RootNode: THREE.Mesh;
    RobotArmature: THREE.Mesh;
  };
  materials: object;
};
