import { useRef } from "react";
import { extend, useFrame, useThree } from "@react-three/fiber";
import CustomObject from "./CustomObject";
// NOTE: Don't import from three/examples, instead npm i three-stdlib and get them there ;)
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

    // Turntable Camera (disable Orbit for sanity)
    const elapsedTime = state.clock.elapsedTime;
    const distance = 8;
    state.camera.position.x = Math.sin(elapsedTime) * distance;
    state.camera.position.z = Math.cos(elapsedTime) * distance;
    state.camera.lookAt(0, 0, 0);
  });
  return (
    <>
      {/* Orbit Camera */}
      <orbitControls args={[camera, gl.domElement]} />

      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />

      {/* Objects */}
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
      <CustomObject />
    </>
  );
}
