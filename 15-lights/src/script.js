import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Pane } from "tweakpane";
import * as TweakpaneRotationInputPlugin from "@0b5vr/tweakpane-plugin-rotation";

import { DirectionalLight } from "./Lights/DirectionalLight.js";
import { PointLight } from "./Lights/PointLight.js";
import { SpotLight } from "./Lights/SpotLight.js";
import { HemisphereLight } from "./Lights/HemisphereLight.js";

/**
 * Base
 */
// Debug
const pane = new Pane();
pane.registerPlugin(TweakpaneRotationInputPlugin);
const params = {
  directionalLight: {
    showHelper: false,
    quat: { x: 0.33, y: 0.04, z: -0.74, w: -0.58 },
    intensity: 0.3,
    color: "rgb(208, 210, 8)",
  },
  pointLight: {
    showHelper: false,
    intensity: 0.4,
    color: "rgb(190, 140, 36)",
    position: { x: 1, y: 2.2, z: 0.5 },
  },
  spotLight: {
    showHelper: false,
    intensity: 0.4,
    color: "rgb(190, 140, 36)",
    position: { x: 1, y: 2.2, z: 0.5 },
    target: { x: 0, y: 0, z: 0 },
    distance: 5, // Maximum range of the light. Default is 0 (no limit).
    angle: (Math.PI / 2) * 0.5, // Maximum angle of light dispersion from its direction whose upper bound is Math.PI/2.
    penumbra: 0.1, // Percent of the spotlight cone that is attenuated due to penumbra. Takes values between zero and 1. Default is zero.
    decay: 1, // The amount the light dims along the distance of the light.
  },
  spot: { x: -0.5, y: 1.4, z: 3.6 },
  spotTarget: { x: 0.5, y: -1.4, z: -1.0 },
  hemisphereLight: {
    expanded: false,
    showHelper: false,
    intensity: 0.8,
    color: "rgb(134, 115, 106)",
    groundColor: "rgb(94, 159, 122)",
    position: { x: 1, y: 2.2, z: 0.5 },
  },
};

// Setup
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffaaab, 0.01);
scene.add(ambientLight);

const directionalLight = new DirectionalLight(
  scene,
  pane,
  params.directionalLight
);

const pointLight = new PointLight(scene, pane, params.pointLight);

const spotLight = new SpotLight(scene, pane, params.spotLight);

new HemisphereLight(scene, pane, params.hemisphereLight);

// const rectAreaLight = new THREE.RectAreaLight(0xffffaf, 2.0, 1.5, 2);
// rectAreaLight.position.set(-1.5, 0, 2.1);
// scene.add(rectAreaLight);

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 32, 64),
  material
);
torus.position.x = 1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  cube.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  cube.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
