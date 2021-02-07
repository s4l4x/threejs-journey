import "./style.css";
import * as THREE from "three";

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Position
// mesh.position.x = 0.7;
// mesh.position.y = -0.6;
// mesh.position.z = 1;
mesh.position.set(0.7, -0.6, 1);

// Scale
// mesh.scale.x = 0.2;
// mesh.scale.y = 1;
// mesh.scale.z = 2;
mesh.scale.set(0.2, 1, 2);

// Rotation
// mesh.rotation.reorder("YXZ");
// mesh.rotation.x = 0;
// mesh.rotation.y = 1;
// mesh.rotation.z = 0.2;
mesh.rotation.set(Math.PI * 0, Math.PI * 0.35, Math.PI * -0.1, "YXZ");

// Axes helper
const axesHelper = new THREE.AxesHelper(1.5);
scene.add(axesHelper);

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
// camera.position.z = 3;
camera.position.set(0.2, 0.3, 3);
scene.add(camera);

camera.lookAt(mesh.position);
console.log(mesh.position.distanceTo(camera.position));

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
