import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import { params } from "./constants.js";
import { paramsTab, fpsGraph } from "./presets.js";

/**
 * Textures
 */
// Loading Manager
const loadingManager = new THREE.LoadingManager();
// loadingManager.onStart = (url, itemsLoaded, itemsTotal) => {
//   console.log(
//     "Started loading file: " +
//       url +
//       "\nLoaded " +
//       itemsLoaded +
//       " of " +
//       itemsTotal +
//       " files."
//   );
// };
loadingManager.onLoad = () => console.log("Loading complete!");
loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
  console.log(
    "Loading file: " +
      url +
      "\nLoaded " +
      itemsLoaded +
      " of " +
      itemsTotal +
      " files."
  );
};
loadingManager.onError = function (url) {
  console.log("There was an error loading " + url);
};
// Texture Loader
const textureLoader = new THREE.TextureLoader(loadingManager);

const aoTexture = textureLoader.load("./Door_Wood_001_ambientOcclusion.jpg");
const colorTexture = textureLoader.load("./Door_Wood_001_basecolor.jpg");
const heightTexture = textureLoader.load("./Door_Wood_001_height.png");
const metallicTexture = textureLoader.load("./Door_Wood_001_metallic.jpg");
const normalTexture = textureLoader.load("./Door_Wood_001_normal.jpg");
const opacityTexture = textureLoader.load("./Door_Wood_001_opacity.jpg");
const roughnessTexture = textureLoader.load("./Door_Wood_001_roughness.jpg");

colorTexture.repeat.x = 2;
colorTexture.repeat.y = 3;
colorTexture.wrapS = THREE.MirroredRepeatWrapping;
colorTexture.wrapT = THREE.RepeatWrapping;

// colorTexture.generateMipmaps = false;
// colorTexture.minFilter = THREE.NearestFilter;
colorTexture.magFilter = THREE.NearestFilter;

/**
 * Setup
 */
const canvas = document.querySelector("canvas.webgl");
const sizes = { width: window.innerWidth, height: window.innerHeight };
const cursor = { x: 0, y: 0 };

/**
 * Scene
 */
const scene = new THREE.Scene();
const axes = new THREE.AxesHelper();
scene.add(axes);

// Objects
const geometry = new THREE.BoxBufferGeometry();
const material = new THREE.MeshBasicMaterial({
  map: colorTexture,
  wireframe: false,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Debug
const meshFolder = paramsTab.addFolder({
  title: "Mesh",
  expanded: true,
});
meshFolder.addInput(mesh.position, "y");
meshFolder
  .addInput(params, "color")
  .on("change", () => mesh.material.color.set(params.color));
meshFolder
  .addButton({ title: "spin" })
  .on("click", () =>
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
  );

// Camera looks at objects
const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.PerspectiveCamera(55, aspectRatio, 0.1, 100);
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100);
camera.position.z = 3;
// camera.lookAt(mesh.position);
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));

/**
 * Event Listeners
 */
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));
});

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = event.clientY / sizes.height - 0.5;
});

window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;
  if (!fullscreenElement) {
    if (canvas.requestFullscreen) canvas.requestFullscreen();
    else if (canvas.webkitRequestFullscreen) canvas.webkitRequestFullscreen();
  } else {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "h") {
    pane.hidden = !pane.hidden;
  }
});

/**
 * Animate
 */
// const clock = new THREE.Clock();

const tick = () => {
  fpsGraph.begin();
  // const elapsedTime = clock.getElapsedTime();

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
  fpsGraph.end();

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
