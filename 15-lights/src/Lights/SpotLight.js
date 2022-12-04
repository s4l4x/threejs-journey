import * as THREE from "three";

export class SpotLight {
  // params: { showHelper, intensity, color, position, targetPosition }
  constructor(scene, pane, params) {
    this.scene = scene;
    this.pane = pane;
    this.params = params;

    this.light = new THREE.SpotLight(
      params.color,
      params.intensity,
      params.distance,
      params.angle,
      params.penumbra,
      params.decay
    );
    this.light.position.set(
      this.params.position.x,
      this.params.position.y,
      this.params.position.z
    );
    this.light.target.position.set(
      this.params.target.x,
      this.params.target.y,
      this.params.target.z
    );
    this.scene.add(this.light, this.light.target);

    this.setupDebugHelperAndPanel();
  }

  /**
   * @brief Create light helper and debug pane controls
   */
  setupDebugHelperAndPanel() {
    const helper = new THREE.SpotLightHelper(this.light, this.params.color);
    helper.visible = this.params.showHelper;
    this.scene.add(helper);
    requestAnimationFrame(() => helper.update());

    const folder = this.pane.addFolder({
      title: "Spot Light",
      expanded: true,
    });

    folder
      .addInput(this.params, "showHelper", { label: "helper" })
      .on("change", () => (helper.visible = !helper.visible));

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

    folder.addInput(this.params, "position").on("change", () => {
      this.light.position.set(
        this.params.position.x,
        this.params.position.y,
        this.params.position.z
      );
      helper.update();
    });

    folder.addInput(this.params, "target").on("change", () => {
      this.light.target.position.set(
        this.params.target.x,
        this.params.target.y,
        this.params.target.z
      );
      helper.update();
    });

    folder
      .addInput(this.params, "distance", { min: 0, max: 20 })
      .on("change", () => {
        this.light.distance = this.params.distance;
        helper.update();
      });

    folder
      .addInput(this.params, "angle", { min: 0, max: Math.PI / 2 })
      .on("change", () => {
        this.light.angle = this.params.angle;
        helper.update();
      });

    folder
      .addInput(this.params, "penumbra", { min: 0, max: 1 })
      .on("change", () => {
        this.light.penumbra = this.params.penumbra;
        helper.update();
      });

    folder
      .addInput(this.params, "decay", { min: 0, max: 10 })
      .on("change", () => {
        this.light.decay = this.params.decay;
        helper.update();
      });
  }
}
