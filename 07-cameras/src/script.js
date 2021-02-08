import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Setup
const sizes = {
  width: 800,
  height: 600,
};
const canvas = document.querySelector("canvas.webgl");

/**
 * Cursor
 */
const cursor = { x: 0, y: 0 };
window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = event.clientY / sizes.height - 0.5;
});

/**
 * Base
 */
// Scene
const scene = new THREE.Scene();

// Axes
const axes = new THREE.AxesHelper();
scene.add(axes);

// Object
const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(mesh);

// const sphere = new THREE.Mesh(
//   new THREE.SphereGeometry(0.5, 16, 16),
//   new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// );
// scene.add(sphere);

// Camera
const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.PerspectiveCamera(55, aspectRatio, 0.1, 100);
// ;
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   100
// );
// camera.position.y = 2;
camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  //   mesh.rotation.y = elapsedTime;

  // Sphere in the camera position
  //   sphere.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
  //   sphere.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;

  // Update camera
  //   camera.position.set(cursor.x * 3, cursor.y * 3, 3);
  //   camera.position.x = Math.sin(cursor.x * 2 * Math.PI) * 2;
  //   camera.position.z = Math.cos(cursor.x * 2 * Math.PI) * 2;
  //   camera.position.y = cursor.y * 5;
  //   camera.lookAt(mesh.position);
  //   console.log(cursor.x.toFixed(3) + " → " + camera.position.x.toFixed(3));
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
