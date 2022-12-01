import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import * as dat from "lil-gui";

/**
 * Base
 */
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();
const gui = new dat.GUI();

/**
 * Loading
 */
const loadingManager = new THREE.LoadingManager();
loadingManager.onProgress = (url, itemsLoaded, itemsTotal) =>
  console.log(
    `Loading file: ${url}\nLoaded ${itemsLoaded} of ${itemsTotal} files.`
  );
loadingManager.onError = (url) =>
  console.log(`There was an error loading ${url}`);

// Textures
const textureLoader = new THREE.TextureLoader(loadingManager);
const matcapTexture = textureLoader.load("./textures/matcaps/7.png");

// Fonts
const fontLoader = new FontLoader(loadingManager);
fontLoader.load("/fonts/Wizardry_Night_Regular.json", (font) => {
  console.log("font loaded");
  drawText(font);
});

/**
 * Objects
 */
if (process.env.NODE_ENV !== "production") {
  const axesHelper = new THREE.AxesHelper();
  scene.add(axesHelper);
}

// Text
const drawText = (font) => {
  const textGeometry = new TextGeometry("Sando", {
    font,
    size: 0.5,
    height: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });
  textGeometry.center();

  const textMaterial = new THREE.MeshMatcapMaterial();
  textMaterial.matcap = matcapTexture;
  //   textMaterial.wireframe = true;
  const text = new THREE.Mesh(textGeometry, textMaterial);

  scene.add(text);
};

// Donuts
const donutMaterial = new THREE.MeshMatcapMaterial();
donutMaterial.matcap = matcapTexture;
const donutGeometry = new THREE.TorusGeometry(0.25, 0.1, 6, 20);

console.time("donuts");
for (let index = 0; index < 500; index++) {
  const donut = new THREE.Mesh(donutGeometry, donutMaterial);

  // Position
  let position = new THREE.Vector3(
    THREE.MathUtils.randFloatSpread(1),
    THREE.MathUtils.randFloatSpread(1),
    THREE.MathUtils.randFloatSpread(1)
  );
  //-- Normalize
  position = position.normalize();

  //-- Distribute
  //-- SEE: https://twitter.com/Yazid/status/1583031608382103553
  const maxRadius = 10.0;
  const r = Math.sqrt(Math.random()) * maxRadius;
  position = position.multiplyScalar(r);

  const scale = position.length() * 0.35;
  donut.scale.set(scale, scale, scale);
  donut.position.set(position.x, position.y, position.z);
  donut.rotation.set(Math.random(Math.PI * 2), Math.random(Math.PI * 2), 0);

  scene.add(donut);
}
console.timeEnd("donuts");

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

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
