import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";

const root = ReactDOM.createRoot(document.querySelector("#root"));

// radius?: number,
// tube?: number,
// tubularSegments?: number,
// radialSegments?: number,
// p?: number,
// q?: number,

root.render(
  <Canvas>
    <mesh>
      <torusKnotGeometry />
      <meshNormalMaterial />
    </mesh>
  </Canvas>
);
