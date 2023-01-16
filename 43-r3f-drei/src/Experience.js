import { useRef } from "react";
import {
  Float,
  Html,
  OrbitControls,
  MeshReflectorMaterial,
  PivotControls,
  Text,
  TransformControls,
} from "@react-three/drei";
import { Caption } from "./Caption";

export default function Experience() {
  const boxRef = useRef();
  const sphereRef = useRef();

  return (
    <>
      {/* NOTE: Use makeDefault to disable OrbitControls when interacting with Objects */}
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <PivotControls
        anchor={[0, -1, 0]}
        depthTest={false}
        lineWidth={4}
        axisColors={["#9381ff", "#ff4d6d", "#7ae582"]}
        // scale={2}
        scale={100}
        fixed={true}
      >
        <mesh ref={sphereRef} position-x={-2} scale={1}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
          <Html
            position={[1, 1, 0]}
            wrapperClass="label"
            center
            distanceFactor={8}
            occlude={[sphereRef, boxRef]}
          >
            That's a sphere 👍
          </Html>
        </mesh>
      </PivotControls>

      <mesh ref={boxRef} position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <TransformControls object={boxRef} /* mode="rotate", etc. */ />

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <MeshReflectorMaterial
          resolution={512}
          blur={[1000, 1000]}
          mixBlur={1}
          mirror={0.5}
          color="greenyellow"
        />
      </mesh>

      <Float speed={5} floatIntensity={2}>
        <Text
          font="./bangers-v20-latin-regular.woff"
          fontSize={1}
          color="salmon"
          position-y={2}
          maxWidth={2}
          textAlign="center"
        >
          I HEART R3F
          <meshNormalMaterial />
        </Text>
      </Float>

      {/* FIXME: How can I position this? */}
      <Html wrapperClass="overlay" position={[1, 1, 0]}>
        Test
      </Html>

      <Caption>{`THE\nOTHER\nWAY\nOF SAYING.`}</Caption>
    </>
  );
}
