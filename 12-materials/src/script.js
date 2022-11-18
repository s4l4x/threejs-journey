import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Pane } from "tweakpane";

const parameters = {
  metalness: 0.52,
  //   roughness: 0.57,
  roughness: 0.24,
  ambientOcclusion: 1.2,
  displacement: 0.05,
  normalScale: new THREE.Vector2(1.0, 1.0),
};

/**
 * Base
 */
const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();
const pane = new Pane();

/**
 * Textures
 */
const loadingManager = new THREE.LoadingManager();
loadingManager.onLoad = () => console.log("Loading complete!");
loadingManager.onProgress = (url, itemsLoaded, itemsTotal) =>
  console.log(
    `Loading file: ${url}\nLoaded ${itemsLoaded} of ${itemsTotal} files.`
  );
loadingManager.onError = (url) =>
  console.log("There was an error loading " + url);

// Textures
const textureLoader = new THREE.TextureLoader(loadingManager);
const doorAlphaTexture = textureLoader.load("./textures/door/alpha.jpg");
const doorAOTexture = textureLoader.load(
  "./textures/door/ambientOcclusion.jpg"
);
const doorColorTexture = textureLoader.load("./textures/door/color.jpg");
const doorHeightTexture = textureLoader.load("./textures/door/height.jpg");
const doorMetalnessTexture = textureLoader.load(
  "./textures/door/metalness.jpg"
);
const doorNormalTexture = textureLoader.load("./textures/door/normal.jpg");
const doorRoughnessTexture = textureLoader.load(
  "./textures/door/roughness.jpg"
);
const gradientTexture = textureLoader.load("./textures/gradients/3.jpg");
gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
gradientTexture.generateMipmaps = false;
// SEE: https://github.com/nidorx/matcaps
const matcapTexture = textureLoader.load("./textures/matcaps/6.png");

// Cube Textures
// SEE: https://polyhaven.com
// SEE: https://matheowis.github.io/HDRI-to-CubeMap/
const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager);
const environmentMapTexture = cubeTextureLoader.load([
  "/textures/environmentMaps/0/px.jpg",
  "/textures/environmentMaps/0/nx.jpg",
  "/textures/environmentMaps/0/py.jpg",
  "/textures/environmentMaps/0/ny.jpg",
  "/textures/environmentMaps/0/pz.jpg",
  "/textures/environmentMaps/0/nz.jpg",
]);

/**
 * Materials
 */
const basicMaterial = new THREE.MeshBasicMaterial();
basicMaterial.map = doorColorTexture;
// material.color.set("#ffff00");
// material.wireframe = true;
basicMaterial.transparent = true;
basicMaterial.alphaMap = doorAlphaTexture;

const normalMaterial = new THREE.MeshNormalMaterial();

const matcapMaterial = new THREE.MeshMatcapMaterial();
matcapMaterial.matcap = matcapTexture;

const depthMaterial = new THREE.MeshDepthMaterial();

const lambertMaterial = new THREE.MeshLambertMaterial();

const phongMaterial = new THREE.MeshPhongMaterial();
phongMaterial.shininess = 500;
phongMaterial.specular = new THREE.Color(0x1188ff);

const toonMaterial = new THREE.MeshToonMaterial();
toonMaterial.gradientMap = gradientTexture;

const standardMaterial = new THREE.MeshStandardMaterial(); // PBR
standardMaterial.map = doorColorTexture;
standardMaterial.aoMap = doorAOTexture;
standardMaterial.displacementMap = doorHeightTexture;
standardMaterial.metalnessMap = doorMetalnessTexture;
standardMaterial.roughnessMap = doorRoughnessTexture;
standardMaterial.normalMap = doorNormalTexture;
standardMaterial.alphaMap = doorAlphaTexture;
standardMaterial.transparent = true;

// standardMaterial.metalness = parameters.metalness;
// standardMaterial.roughness = parameters.roughness;
standardMaterial.aoMapIntensity = parameters.ambientOcclusion;
standardMaterial.displacementScale = parameters.displacement;
standardMaterial.normalScale = parameters.normalScale;

const standardMaterial2 = new THREE.MeshStandardMaterial();
standardMaterial2.metalness = parameters.metalness;
standardMaterial2.roughness = parameters.roughness;
standardMaterial2.envMap = environmentMapTexture;

// const physicalMaterial = new THREE.MeshPhysicalMaterial(); // Standard Material + Clear Coat
// const pointsMaterial = new THREE.PointsMaterial(); // Particles

// const material = basicMaterial;
// const material = normalMaterial;
// const material = matcapMaterial;
// const material = depthMaterial;
// const material = lambertMaterial;
// const material = phongMaterial;
// const material = toonMaterial;
const material = standardMaterial2;
material.side = THREE.DoubleSide;
// material.flatShading = true;

// Debug
pane.addInput(material, "metalness");
pane.addInput(material, "roughness");
pane.addInput(material, "aoMapIntensity");
pane.addInput(material, "displacementScale");
pane.addInput(material, "normalScale");

/**
 * Objects
 */
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 32), material);
sphere.translateX(1.5);
// Used for AO map;
sphere.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
);
// console.log(sphere.geometry.attributes);

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);
plane.translateX(0);
plane.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.4, 0.2, 64, 128),
  material
);
torus.position.x = -1.5;
torus.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
);

scene.add(sphere, plane, torus);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.25);
const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(ambientLight, pointLight);

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
  sphere.rotation.y = elapsedTime * 0.2;
  plane.rotation.y = elapsedTime * 0.2;
  torus.rotation.y = elapsedTime * 0.2;

  sphere.rotation.x = elapsedTime * 0.1;
  plane.rotation.x = elapsedTime * 0.1;
  torus.rotation.x = elapsedTime * 0.1;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
