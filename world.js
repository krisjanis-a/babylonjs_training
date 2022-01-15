const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

// Add your code here matching the playground format
const createScene = function () {
  // Scene creation
  const scene = new BABYLON.Scene(engine);

  // Add objects to scene
  const ground = buildGround(25, 25);
  buildDwellings();

  // CAMERA
  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    Math.PI / 1.25,
    Math.PI / 2.75,
    15,
    new BABYLON.Vector3(0, 0, 0)
  );

  camera.attachControl(canvas, true);

  // LIGHT
  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(1, 1, 0)
  );

  return scene;
};

const buildDwellings = () => {
  const places = []; //each entry is an array [house type, rotation, x, z]
  places.push([1, -Math.PI / 16, -6.8, 2.5]);
  places.push([3, -Math.PI / 16, -4.5, 3]);
  places.push([2, -Math.PI / 16, -1.5, 4]);
  places.push([4, -Math.PI / 3, 1.5, 6]);
  places.push([2, (15 * Math.PI) / 16, -6.4, -1.5]);
  places.push([1, (15 * Math.PI) / 16, -4.1, -1]);
  places.push([2, (15 * Math.PI) / 16, -2.1, -0.5]);
  places.push([1, (5 * Math.PI) / 4, 0, -1]);
  places.push([1, Math.PI + Math.PI / 2.5, 0.5, -3]);
  places.push([2, Math.PI + Math.PI / 2.1, 0.75, -5]);
  places.push([4, Math.PI + Math.PI / 2.25, 0.75, -8]);
  places.push([3, Math.PI / 1.9, 4.75, -1]);
  places.push([1, Math.PI / 1.95, 4.5, -3]);
  places.push([2, Math.PI / 1.9, 4.75, -5]);
  places.push([1, Math.PI / 1.9, 4.75, -7]);
  places.push([3, -Math.PI / 3, 5.25, 2]);
  places.push([1, -Math.PI / 3, 6, 4]);

  //Create instances from the first two that were built
  const houses = [];
  for (let i = 0; i < places.length; i++) {
    houses[i] = addHouseToScene(places[i][0]);

    houses[i].rotation.y = places[i][1];
    houses[i].position.x = places[i][2];
    houses[i].position.z = places[i][3];
  }
};

const addHouseToScene = (houseType) => {
  switch (houseType) {
    case 1: {
      const cubeHouseSmall = buildHouse("CUBE", 1, 1, 1);
      return cubeHouseSmall;
    }
    case 2: {
      const cubeHouseBig = buildHouse("CUBE", 1.5, 1.5, 1.5);
      return cubeHouseBig;
    }
    case 3: {
      const semiDetachedHouseSmall = buildHouse("SEMI_DETACHED", 1.5, 1, 1);
      return semiDetachedHouseSmall;
    }
    case 4: {
      const semiDetachedHouseBig = buildHouse("SEMI_DETACHED", 2.5, 1.25, 1.5);
      return semiDetachedHouseBig;
    }
  }
};

//! BUILD FUNCTIONS

// BASE
const buildBase = (type, width, height, depth) => {
  // FaceUV
  let houseFaceUV = [];
  // Material
  const houseMat = new BABYLON.StandardMaterial("houseMat");

  // Set parameters depending on house type
  if (type === "CUBE") {
    // texture
    houseMat.diffuseTexture = new BABYLON.Texture("./cubehouse.png");

    // FaceUV
    houseFaceUV[0] = new BABYLON.Vector4(0.5, 0, 0.75, 1.0); //rear face
    houseFaceUV[1] = new BABYLON.Vector4(0.0, 0, 0.25, 1.0); //front face
    houseFaceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0); //right side
    houseFaceUV[3] = new BABYLON.Vector4(0.75, 0, 1.0, 1.0); //left side
  }
  if (type === "SEMI_DETACHED") {
    // texture
    houseMat.diffuseTexture = new BABYLON.Texture(
      "./cubehouse_semi_detached.png"
    );

    // FaceUV
    houseFaceUV[0] = new BABYLON.Vector4(0.6, 0, 1.0, 1.0); //rear face
    houseFaceUV[1] = new BABYLON.Vector4(0.0, 0, 0.4, 1.0); //front face
    houseFaceUV[2] = new BABYLON.Vector4(0.4, 0, 0.6, 1.0); //right side
    houseFaceUV[3] = new BABYLON.Vector4(0.4, 0, 0.6, 1.0); //left side
  }

  const base = BABYLON.MeshBuilder.CreateBox("base", {
    height: 1,
    width: 1,
    depth: 1,
    faceUV: houseFaceUV,
    wrap: true,
  });

  base.position.y = height / 2;
  base.scaling = new BABYLON.Vector3(width, height, depth);

  base.material = houseMat;

  return base;
};

// ROOF
const buildRoof = (width, height, depth) => {
  // Material
  const roofMat = new BABYLON.StandardMaterial("roofMat");
  roofMat.diffuseTexture = new BABYLON.Texture(
    "https://assets.babylonjs.com/environments/roof.jpg"
  );

  // Roof shape => cylinder with triangle base
  const roof = BABYLON.MeshBuilder.CreateCylinder("roof", {
    diameter: 1.5,
    height: 1,
    tessellation: 3,
  });

  // Scale and rotate to correct position
  roof.scaling.x = height * 0.5;
  roof.scaling.y = width * 1.1;
  roof.scaling.z = depth;
  roof.rotation.z = Math.PI / 2;
  roof.position.y = height * 1.175;

  roof.material = roofMat;

  return roof;
};

// HOUSE
const buildHouse = (type, width, height, depth) => {
  const base = buildBase(type, width, height, depth);
  const roof = buildRoof(width, height, depth);

  const house = BABYLON.Mesh.MergeMeshes(
    [base, roof],
    true,
    false,
    null,
    false,
    true
  );

  return house;
};

// GROUND
const buildGround = (width, height) => {
  const ground = BABYLON.MeshBuilder.CreateGround("ground", {
    width: width,
    height: height,
  });

  const groundMat = new BABYLON.StandardMaterial("groundMat");

  groundMat.diffuseColor = new BABYLON.Color3(0.15, 0.25, 0);
  ground.material = groundMat; //Place the material property of the ground

  return ground;
};

// Render the scene
const scene = createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
  scene.render();
});

// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
  engine.resize();
});
