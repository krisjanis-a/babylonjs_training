// import earcut from "earcut";
import * as earcut from "earcut";

const createCar = (scene) => {
  //base
  const outline = [
    new BABYLON.Vector3(-0.4, 0, -0.1),
    new BABYLON.Vector3(0.2, 0, -0.1),
  ];

  //   curved front
  for (let i = 0; i < 20; i++) {
    outline.push(
      new BABYLON.Vector3(
        0.2 * Math.cos((i * Math.PI) / 40),
        0,
        0.2 * Math.sin((i * Math.PI) / 40) - 0.1
      )
    );
  }

  //top
  outline.push(new BABYLON.Vector3(0, 0, 0.1));
  outline.push(new BABYLON.Vector3(-0.4, 0, 0.1));

  //back formed automatically

  const faceUV = [];
  faceUV[0] = new BABYLON.Vector4(0, 0.5, 0.38, 1);
  faceUV[1] = new BABYLON.Vector4(0, 0, 1, 0.5);
  faceUV[2] = new BABYLON.Vector4(0.38, 1, 0, 0.5);

  const wheelUV = [];
  wheelUV[0] = new BABYLON.Vector4(0, 0, 1, 1);
  wheelUV[1] = new BABYLON.Vector4(0, 0.5, 0, 0.5);
  wheelUV[2] = new BABYLON.Vector4(0, 0, 1, 1);

  const carMat = new BABYLON.StandardMaterial("carMat");
  carMat.diffuseTexture = new BABYLON.Texture("./src/assets/car.png");

  const wheelMat = new BABYLON.StandardMaterial("wheelMat");
  wheelMat.diffuseTexture = new BABYLON.Texture("./src/assets/wheel.png");

  const car = BABYLON.MeshBuilder.ExtrudePolygon(
    "car",
    {
      shape: outline,
      depth: 0.25,
      faceUV: faceUV,
      wrap: true,
    },
    scene,
    earcut
  );

  car.material = carMat;

  const wheelRB = BABYLON.MeshBuilder.CreateCylinder("wheelRB", {
    diameter: 0.125,
    height: 0.05,
    faceUV: wheelUV,
    wrap: true,
  });

  wheelRB.material = wheelMat;

  wheelRB.parent = car;
  wheelRB.position.z = -0.075;
  wheelRB.position.x = -0.275;
  wheelRB.position.y = 0.025;

  const wheelRF = wheelRB.clone("wheelRF");
  wheelRF.position.x = 0.1;

  const wheelLB = wheelRB.clone("wheelLB");
  wheelLB.position.y = -0.25 - 0.025;

  const wheelLF = wheelRF.clone("wheelLF");
  wheelLF.position.y = -0.25 - 0.025;

  //! wheel animation
  const animWheel = new BABYLON.Animation(
    "wheelAnimation",
    "rotation.y",
    30,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
  );

  const wheelKeys = [];

  //At the animation key 0, the value of rotation.y is 0
  wheelKeys.push({
    frame: 0,
    value: 0,
  });

  //At the animation key 30, (after 1 sec since animation fps = 30) the value of rotation.y is 2PI for a complete rotation
  wheelKeys.push({
    frame: 30,
    value: 2 * Math.PI,
  });

  //set the keys
  animWheel.setKeys(wheelKeys);

  //Link this animation to the right back wheel
  wheelRB.animations = [];
  wheelRB.animations.push(animWheel);

  wheelRF.animations = [];
  wheelRF.animations.push(animWheel);

  wheelLB.animations = [];
  wheelLB.animations.push(animWheel);

  wheelLF.animations = [];
  wheelLF.animations.push(animWheel);

  //Begin animation - object to animate, first frame, last frame and loop if true
  scene.beginAnimation(wheelRB, 0, 30, true);
  scene.beginAnimation(wheelRF, 0, 30, true);
  scene.beginAnimation(wheelLB, 0, 30, true);
  scene.beginAnimation(wheelLF, 0, 30, true);

  return scene;
};

export default createCar;
