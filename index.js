const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

// Add your code here matching the playground format
const createScene = function () {
  // Scene creation
  const scene = new BABYLON.Scene(engine);

  // Material
  // const material = new BABYLON.StandardMaterial("name", scene);

  //! BOX / HOUSE

  // House
  houseFaceUV = [];
  houseFaceUV[0] = new BABYLON.Vector4(0.5, 0, 0.75, 1.0); //rear face
  houseFaceUV[1] = new BABYLON.Vector4(0.0, 0, 0.25, 1.0); //front face
  houseFaceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0); //right side
  houseFaceUV[3] = new BABYLON.Vector4(0.75, 0, 1.0, 1.0); //left side

  const box = BABYLON.MeshBuilder.CreateBox("box", {
    height: 1,
    width: 1,
    depth: 1,
    faceUV: houseFaceUV,
    wrap: true,
  });

  box.position.y = 1;
  box.scaling = new BABYLON.Vector3(3, 2, 2);

  const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {
    diameter: 1.5,
    height: 3,
    tessellation: 3,
  });
  roof.scaling.x = 1.1;
  roof.scaling.y = 1.2;
  roof.scaling.z = 2.1;
  roof.rotation.z = Math.PI / 2;
  roof.position.y = 2.25;

  const roofMat = new BABYLON.StandardMaterial("roofMat");
  roofMat.diffuseTexture = new BABYLON.Texture(
    "https://assets.babylonjs.com/environments/roof.jpg",
    scene
  );
  const houseMat = new BABYLON.StandardMaterial("houseMat");
  houseMat.diffuseTexture = new BABYLON.Texture("./cubehouse.png");

  box.material = houseMat;
  roof.material = roofMat;

  const house = BABYLON.Mesh.MergeMeshes(
    [box, roof],
    true,
    false,
    null,
    false,
    true
  );

  // Semi detached house
  houseSDFaceUV = [];
  houseSDFaceUV[0] = new BABYLON.Vector4(0.6, 0, 1.0, 1.0); //rear face
  houseSDFaceUV[1] = new BABYLON.Vector4(0.0, 0, 0.4, 1.0); //front face
  houseSDFaceUV[2] = new BABYLON.Vector4(0.4, 0, 0.6, 1.0); //right side
  houseSDFaceUV[3] = new BABYLON.Vector4(0.4, 0, 0.6, 1.0); //left side

  const boxSD = BABYLON.MeshBuilder.CreateBox("box", {
    height: 1,
    width: 1,
    depth: 1,
    faceUV: houseSDFaceUV,
    wrap: true,
  });

  boxSD.position.x = 4;
  boxSD.position.z = 4;
  boxSD.position.y = 1;
  boxSD.scaling = new BABYLON.Vector3(5, 2, 2);

  const roofSD = BABYLON.MeshBuilder.CreateCylinder("roof", {
    diameter: 1.5,
    height: 3,
    tessellation: 3,
  });
  roofSD.scaling.x = 1.1;
  roofSD.scaling.y = 2;
  roofSD.scaling.z = 2.1;
  roofSD.position.x = 4;
  roofSD.position.z = 4;
  roofSD.position.y = 2.25;
  roofSD.rotation.z = Math.PI / 2;

  const houseSDMat = new BABYLON.StandardMaterial("houseSDMat");
  houseSDMat.diffuseTexture = new BABYLON.Texture(
    "./cubehouse_semi_detached.png"
  );

  boxSD.material = houseSDMat;
  roofSD.material = roofMat;

  const houseSD = BABYLON.Mesh.MergeMeshes(
    [boxSD, roofSD],
    true,
    false,
    null,
    false,
    true
  );

  //! GROUND

  const ground = BABYLON.MeshBuilder.CreateGround("ground", {
    width: 10,
    height: 10,
  });

  const groundMat = new BABYLON.StandardMaterial("groundMat");
  groundMat.diffuseColor = new BABYLON.Color3(0.25, 0.5, 0);
  ground.material = groundMat; //Place the material property of the ground

  //! CAMERA

  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    Math.PI / 1.25,
    Math.PI / 2.75,
    15,
    new BABYLON.Vector3(0, 0, 0)
  );

  camera.attachControl(canvas, true);

  //! LIGHT

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
