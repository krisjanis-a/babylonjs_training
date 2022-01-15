// BASE
const buildBase = (type, width, height, depth) => {
  // FaceUV
  let houseFaceUV = [];
  // Material
  const houseMat = new BABYLON.StandardMaterial("houseMat");

  // Set parameters depending on house type
  if (type === "CUBE") {
    // texture
    houseMat.diffuseTexture = new BABYLON.Texture("./src/assets/cubehouse.png");

    // FaceUV
    houseFaceUV[0] = new BABYLON.Vector4(0.5, 0, 0.75, 1.0); //rear face
    houseFaceUV[1] = new BABYLON.Vector4(0.0, 0, 0.25, 1.0); //front face
    houseFaceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0); //right side
    houseFaceUV[3] = new BABYLON.Vector4(0.75, 0, 1.0, 1.0); //left side
  }
  if (type === "SEMI_DETACHED") {
    // texture
    houseMat.diffuseTexture = new BABYLON.Texture(
      "./src/assets/cubehouse_semi_detached.png"
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

export default buildHouse;
