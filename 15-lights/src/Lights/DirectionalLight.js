import * as THREE from "three";

export class DirectionalLight {
  // params: { showHelper, quat, intensity, color }
  constructor(scene, pane, params) {
    this.scene = scene;
    this.pane = pane;
    this.params = params;

    this.light = new THREE.DirectionalLight(params.color, params.intensity);
    this.setPositionFromQuat(this.light, params.quat);
    scene.add(this.light);

    this.setupDebugHelperAndPanel();
  }

  /**
   * @brief Allow for the rotation of the directional light
   *
   * @param {*} object3d
   * @param {*} quat
   */
  setPositionFromQuat(object3d, quat) {
    const vector = new THREE.Vector3(0.0, 0.0, 1.0);
    vector.applyQuaternion(quat);
    object3d.position.set(vector.x, vector.y, vector.z);
  }

  /**
   * @brief Create light helper and debug pane controls
   */
  setupDebugHelperAndPanel() {
    const helper = new THREE.DirectionalLightHelper(
      this.light,
      this.params.intensity
    );
    helper.visible = this.params.showHelper;
    this.scene.add(helper);

    const folder = this.pane.addFolder({
      title: "Directional Light",
      expanded: true,
    });
    folder
      .addInput(this.params, "showHelper", { label: "helper" })
      .on("change", () => (helper.visible = !helper.visible));
    folder
      .addInput(this.params, "quat", {
        label: "rotation",
        view: "rotation",
        rotationMode: "quaternion", // optional, 'quaternion' by default
        picker: "popup", // 'inline' or 'popup'. optional, 'popup' by default
        expanded: false, // optional, false by default
      })
      .on("change", () => {
        this.setPositionFromQuat(this.light, this.params.quat);
        helper.update();
      });
    folder
      .addInput(this.params, "intensity", { min: 0, max: 2 })
      .on("change", () => {
        this.light.intensity = this.params.intensity;
      });

    folder
      .addInput(this.params, "color")
      .on(
        "change",
        () => (this.light.color = new THREE.Color(this.params.color))
      );
  }
}
