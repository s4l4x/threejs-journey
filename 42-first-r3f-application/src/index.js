import "./style.css";
import ReactDOM from "react-dom/client";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.js";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <Canvas
    // Override the min, max pixel ratio. default is [1, 2]
    // dpr={[1, 2]}
    // Override default webgl settings
    gl={{
      antialias: true,
      toneMapping: THREE.ACESFilmicToneMapping, // or THREE.CineonToneMapping etc.
      outputEncoding: THREE.sRGBEncoding, // or THREE.LinearEncoding
    }}
    // Override default camera settings
    // Orthographic camera
    // orthographic={true}
    // camera={{ zoom: 100, near: 0.1, far: 200, position: [3, 2, 6] }}

    // Perspective camera
    camera={{ fov: 45, near: 0.1, far: 200, position: [3, 2, 6] }}
  >
    <Experience />
  </Canvas>
);
