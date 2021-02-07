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
// Make a group
const group = new THREE.Group();
group.rotation.set(Math.PI * 0.25, Math.PI * 0.25, 0, "XYZ");
group.position.set(1.4, -1.3, 0.1);
scene.add(group);

// Add some cubes
const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
cube1.position.x = -1.5;
group.add(cube1);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
group.add(cube2);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
cube3.position.x = 1.5;
group.add(cube3);

// Axes helper
const axesHelper = new THREE.AxesHelper(1.5);
scene.add(axesHelper);

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(0, 0, 3);
scene.add(camera);

// Look at our group's position
camera.lookAt(group.position);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
