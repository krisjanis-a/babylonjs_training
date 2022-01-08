const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

// Add your code here matching the playground format
const createScene = function () {
  const scene = new BABYLON.Scene(engine);

  // The first parameter can be set to null to load all meshes and skeletons
  const card = BABYLON.SceneLoader.ImportMesh(
    "",
    "./",
    "Card_QD.gltf",
    scene,
    function (meshes, particleSystems, skeletons) {
      // do something with the meshes and skeletons
      // particleSystems are always null for glTF assets
    }
  );

  const box = BABYLON.MeshBuilder.CreateBox("box", {
    height: 3,
    width: 2,
  });

  box.position.y = 1.75;

  const ground = BABYLON.MeshBuilder.CreateGround("ground", {
    width: 10,
    height: 10,
  });

  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    -Math.PI / 2,
    Math.PI / 2.5,
    15,
    new BABYLON.Vector3(0, 0, 0)
  );

  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(1, 1, 0)
  );

  return scene;
};

const scene = createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
  scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
  engine.resize();
});
