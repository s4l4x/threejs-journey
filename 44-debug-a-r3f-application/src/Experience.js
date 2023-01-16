import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
import { Perf } from "r3f-perf";

export function Experience() {
  const { position, color, visible, perfVisible } = useControls({
    position: { value: { x: -2, y: 0, z: 0 }, step: 0.1 },
    color: "#ff0000",
    visible: true,
    perfVisible: true,
  });

  return (
    <>
      {perfVisible && <Perf position="top-left" />}

      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh position={[position.x, position.y, position.z]} visible={visible}>
        <sphereGeometry />
        <meshStandardMaterial color={color} />
      </mesh>

      <mesh position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
