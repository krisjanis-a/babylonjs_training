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

export default buildGround;
