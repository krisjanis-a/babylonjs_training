import createCar from "./car.js";
import buildHouse from "./house.js";
import buildGround from "./ground.js";

const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

// Add your code here matching the playground format
const createWorld = function () {
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

  createCar(scene);

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

export default createWorld;
