import { Pane } from "tweakpane";
import * as EssentialsPlugin from "@tweakpane/plugin-essentials";
import { params, presets } from "./constants.js";

// Pane Setup
const pane = new Pane();
pane.registerPlugin(EssentialsPlugin);

// Tab Setup
const tabs = pane.addTab({
  pages: [{ title: "Parameters" }, { title: "Presets" }],
});
export const paramsTab = tabs.pages[0];
const presetsTab = tabs.pages[1];

// FPS Graph
export const fpsGraph = paramsTab.addBlade({
  view: "fpsgraph",
  label: "fpsgraph",
  lineCount: 2,
});

// Presets Tab
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

// Event Listeners
pane.on("change", () => {
  params.presetJson = JSON.stringify(pane.exportPreset(), null, 2);
});
