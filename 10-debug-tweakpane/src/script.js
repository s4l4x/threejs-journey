import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Pane } from "tweakpane";
import * as EssentialsPlugin from "@tweakpane/plugin-essentials";
import gsap from "gsap";

// Setup
const canvas = document.querySelector("canvas.webgl");
const sizes = { width: window.innerWidth, height: window.innerHeight };
const cursor = { x: 0, y: 0 };

/**
 * Scene
 */
const scene = new THREE.Scene();
const axes = new THREE.AxesHelper();
scene.add(axes);

/**
 * Debug
 */
const params = {
  presetId: "",
  presetJson: "",
  color: "#ff0055",
  spin: () => console.log("spin"),
};

const pane = new Pane();
pane.registerPlugin(EssentialsPlugin);
const tabs = pane.addTab({
  pages: [{ title: "Parameters" }, { title: "Presets" }],
});
const paramsTab = tabs.pages[0];
const presetsTab = tabs.pages[1];

// Presets
const presets = {
  atmos: {
    y: 1,
    color: "#11ffff",
  },
};

presetsTab
  .addInput(params, "presetId", {
    label: "import",
    options: {
      "Choose Preset...": "",
      atmos: "atmos",
    },
  })
  .on("change", (e) => {
    const preset = presets[e.value];
    preset && ((params.presetId = ""), pane.importPreset(preset));
  });

presetsTab
  .addButton({ title: "Console Log", label: "export" })
  .on("click", () => {
    const preset = pane.exportPreset();
    console.log(preset);
  });

presetsTab.addMonitor(params, "presetJson", {
  label: "data",
  lineCount: 6,
  multiline: !0,
});

pane.on("change", () => {
  params.presetJson = JSON.stringify(pane.exportPreset(), null, 2);
});

// FPS Graph
const fpsGraph = paramsTab.addBlade({
  view: "fpsgraph",
  label: "fpsgraph",
  lineCount: 2,
});

/**
 * Objects
 */
function drawMess() {
  const triangleCount = 50;

  // Triangles * vertices * xyz
  const arrayLength = triangleCount * 3 * 3;
  const positionsArray = new Float32Array(arrayLength);
  for (let i = 0; i < arrayLength; i++) {
    positionsArray[i] = Math.random() - 0.5;
  }
  const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", positionsAttribute);
  const material = new THREE.MeshBasicMaterial({
    color: params.color,
    wireframe: true,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  /**
   * Debug
   */
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
}
drawMess();

function drawTriangle() {
  const positionsArray = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);
  const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", positionsAttribute);
  const material = new THREE.MeshBasicMaterial({
    color: 0xfff000,
    wireframe: true,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
}
drawTriangle();

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.1, 16, 16),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
scene.add(sphere);

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

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  fpsGraph.begin();
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
  fpsGraph.end();

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
