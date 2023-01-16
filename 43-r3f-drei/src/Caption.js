import { useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";

export function Caption({ children }) {
  const { width } = useThree((state) => state.viewport);
  return (
    <Text
      position={[0, 0, -5]}
      lineHeight={0.8}
      //   font="/Ki-Medium.ttf"
      color="rgb(10, 17, 11)"
      fontSize={width / 8}
      material-toneMapped={false}
      anchorX="center"
      anchorY="middle"
    >
      {children}
      <meshNormalMaterial />
    </Text>
  );
}
