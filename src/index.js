import createWorld from "./world.js";

// Render the scene
const scene = createWorld(); //Call the createScene function
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

console.log("This happens");
// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
  scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
  engine.resize();
});
