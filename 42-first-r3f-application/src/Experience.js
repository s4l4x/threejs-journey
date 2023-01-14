import { useRef } from "react";
import { extend, useFrame, useThree } from "@react-three/fiber";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { OrbitControls } from "three-stdlib";
extend({ OrbitControls });

export default function Experience() {
  const { camera, gl } = useThree();
  const cubeRef = useRef();
  const groupRef = useRef();
  useFrame((state, delta) => {
    cubeRef.current.rotation.y -= 1.5 * delta;
    groupRef.current.rotation.y += delta;
  });
  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <group ref={groupRef}>
        <mesh
          ref={cubeRef}
          rotation-y={Math.PI * 0.25}
          position-x={2}
          scale={1.5}
        >
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" wireframe={false} />
        </mesh>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
      </group>
      <mesh rotation-x={Math.PI * -0.5} position-y={-2} scale={[10, 6, 1]}>
        <planeGeometry />
        <meshStandardMaterial color="green" />
      </mesh>
    </>
  );
}
