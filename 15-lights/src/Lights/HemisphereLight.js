import * as THREE from "three";

export class HemisphereLight {
  // params: { expanded, showHelper, intensity, color, groundColor, position }
  constructor(scene, pane, params) {
    this.scene = scene;
    this.pane = pane;
    this.params = params;

    this.light = new THREE.HemisphereLight(
      params.color,
      params.groundColor,
      params.intensity
    );
    this.light.position.set(
      this.params.position.x,
      this.params.position.y,
      this.params.position.z
    );
    this.scene.add(this.light);

    this.setupDebugHelperAndPanel();
  }

  /**
   * @brief Create light helper and debug pane controls
   */
  setupDebugHelperAndPanel() {
    const helper = new THREE.HemisphereLightHelper(
      this.light,
      this.params.intensity
    );
    helper.visible = this.params.showHelper;
    this.scene.add(helper);

    const folder = this.pane.addFolder({
      title: "Hemisphere Light",
      expanded: this.params.expanded,
    });
    folder
      .addInput(this.params, "showHelper", { label: "helper" })
      .on("change", () => (helper.visible = !helper.visible));
    folder
      .addInput(this.params, "intensity", { min: 0, max: 2 })
      .on("change", () => {
        this.light.intensity = this.params.intensity;
      });
    folder.addInput(this.params, "color").on("change", () => {
      this.light.color = new THREE.Color(this.params.color);
      helper.update();
    });
    folder.addInput(this.params, "groundColor").on("change", () => {
      this.light.groundColor = new THREE.Color(this.params.groundColor);
      helper.update();
    });
    folder
      .addInput(this.params, "position")
      .on("change", () =>
        this.light.position.set(
          this.params.position.x,
          this.params.position.y,
          this.params.position.z
        )
      );
  }
}
