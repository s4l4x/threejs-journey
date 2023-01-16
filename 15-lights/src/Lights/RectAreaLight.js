import * as THREE from "three";
// import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper.js";

export class RectAreaLight {
  // params: { expanded, showHelper, intensity, color, groundColor, position }
  constructor(scene, pane, params) {
    this.scene = scene;
    this.pane = pane;
    this.params = params;

    this.light = new THREE.RectAreaLight(
      params.color,
      params.intensity,
      params.width,
      params.height
    );
    this.light.position.set(
      this.params.position.x,
      this.params.position.y,
      this.params.position.z
    );
    this.light.lookAt(
      this.params.lookAt.x,
      this.params.lookAt.y,
      this.params.lookAt.z
    );
    this.scene.add(this.light);

    this.setupDebugHelperAndPanel();
  }

  /**
   * @brief Create light helper and debug pane controls
   */
  setupDebugHelperAndPanel() {
    // const helper = new RectAreaLightHelper(this.light, this.params.color);
    // helper.visible = this.params.showHelper;
    // this.scene.add(helper);
    // requestAnimationFrame(() => helper.update());

    const folder = this.pane.addFolder({
      title: "Rect Area",
      expanded: this.params.expanded,
    });

    // folder
    //   .addInput(this.params, "showHelper", { label: "helper" })
    //   .on("change", () => (helper.visible = !helper.visible));

    folder
      .addInput(this.params, "intensity", { min: 0, max: 4 })
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
      // helper.update();
    });

    folder.addInput(this.params, "lookAt").on("change", () => {
      this.light.lookAt(
        this.params.lookAt.x,
        this.params.lookAt.y,
        this.params.lookAt.z
      );
      // helper.update();
    });
  }
}
