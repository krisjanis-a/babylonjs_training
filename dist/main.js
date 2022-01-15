/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _world__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./world */ \"./src/world.js\");\n\r\n\r\n// Render the scene\r\nconst scene = (0,_world__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(); //Call the createScene function\r\n\r\n// Register a render loop to repeatedly render the scene\r\nengine.runRenderLoop(function () {\r\n  scene.render();\r\n});\r\n\r\n// Watch for browser/canvas resize events\r\nwindow.addEventListener(\"resize\", function () {\r\n  engine.resize();\r\n});\r\n\n\n//# sourceURL=webpack://babylonjs_training/./src/index.js?");

/***/ }),

/***/ "./src/world.js":
/*!**********************!*\
  !*** ./src/world.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst canvas = document.getElementById(\"renderCanvas\"); // Get the canvas element\r\nconst engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine\r\n\r\n// Add your code here matching the playground format\r\nconst createWorld = function () {\r\n  // Scene creation\r\n  const scene = new BABYLON.Scene(engine);\r\n\r\n  // Add objects to scene\r\n  const ground = buildGround(25, 25);\r\n  buildDwellings();\r\n\r\n  // CAMERA\r\n  const camera = new BABYLON.ArcRotateCamera(\r\n    \"camera\",\r\n    Math.PI / 1.25,\r\n    Math.PI / 2.75,\r\n    15,\r\n    new BABYLON.Vector3(0, 0, 0)\r\n  );\r\n\r\n  camera.attachControl(canvas, true);\r\n\r\n  // LIGHT\r\n  const light = new BABYLON.HemisphericLight(\r\n    \"light\",\r\n    new BABYLON.Vector3(1, 1, 0)\r\n  );\r\n\r\n  return scene;\r\n};\r\n\r\nconst buildDwellings = () => {\r\n  const places = []; //each entry is an array [house type, rotation, x, z]\r\n  places.push([1, -Math.PI / 16, -6.8, 2.5]);\r\n  places.push([3, -Math.PI / 16, -4.5, 3]);\r\n  places.push([2, -Math.PI / 16, -1.5, 4]);\r\n  places.push([4, -Math.PI / 3, 1.5, 6]);\r\n  places.push([2, (15 * Math.PI) / 16, -6.4, -1.5]);\r\n  places.push([1, (15 * Math.PI) / 16, -4.1, -1]);\r\n  places.push([2, (15 * Math.PI) / 16, -2.1, -0.5]);\r\n  places.push([1, (5 * Math.PI) / 4, 0, -1]);\r\n  places.push([1, Math.PI + Math.PI / 2.5, 0.5, -3]);\r\n  places.push([2, Math.PI + Math.PI / 2.1, 0.75, -5]);\r\n  places.push([4, Math.PI + Math.PI / 2.25, 0.75, -8]);\r\n  places.push([3, Math.PI / 1.9, 4.75, -1]);\r\n  places.push([1, Math.PI / 1.95, 4.5, -3]);\r\n  places.push([2, Math.PI / 1.9, 4.75, -5]);\r\n  places.push([1, Math.PI / 1.9, 4.75, -7]);\r\n  places.push([3, -Math.PI / 3, 5.25, 2]);\r\n  places.push([1, -Math.PI / 3, 6, 4]);\r\n\r\n  //Create instances from the first two that were built\r\n  const houses = [];\r\n  for (let i = 0; i < places.length; i++) {\r\n    houses[i] = addHouseToScene(places[i][0]);\r\n\r\n    houses[i].rotation.y = places[i][1];\r\n    houses[i].position.x = places[i][2];\r\n    houses[i].position.z = places[i][3];\r\n  }\r\n};\r\n\r\nconst addHouseToScene = (houseType) => {\r\n  switch (houseType) {\r\n    case 1: {\r\n      const cubeHouseSmall = buildHouse(\"CUBE\", 1, 1, 1);\r\n      return cubeHouseSmall;\r\n    }\r\n    case 2: {\r\n      const cubeHouseBig = buildHouse(\"CUBE\", 1.5, 1.5, 1.5);\r\n      return cubeHouseBig;\r\n    }\r\n    case 3: {\r\n      const semiDetachedHouseSmall = buildHouse(\"SEMI_DETACHED\", 1.5, 1, 1);\r\n      return semiDetachedHouseSmall;\r\n    }\r\n    case 4: {\r\n      const semiDetachedHouseBig = buildHouse(\"SEMI_DETACHED\", 2.5, 1.25, 1.5);\r\n      return semiDetachedHouseBig;\r\n    }\r\n  }\r\n};\r\n\r\n//! BUILD FUNCTIONS\r\n\r\n// BASE\r\nconst buildBase = (type, width, height, depth) => {\r\n  // FaceUV\r\n  let houseFaceUV = [];\r\n  // Material\r\n  const houseMat = new BABYLON.StandardMaterial(\"houseMat\");\r\n\r\n  // Set parameters depending on house type\r\n  if (type === \"CUBE\") {\r\n    // texture\r\n    houseMat.diffuseTexture = new BABYLON.Texture(\"./cubehouse.png\");\r\n\r\n    // FaceUV\r\n    houseFaceUV[0] = new BABYLON.Vector4(0.5, 0, 0.75, 1.0); //rear face\r\n    houseFaceUV[1] = new BABYLON.Vector4(0.0, 0, 0.25, 1.0); //front face\r\n    houseFaceUV[2] = new BABYLON.Vector4(0.25, 0, 0.5, 1.0); //right side\r\n    houseFaceUV[3] = new BABYLON.Vector4(0.75, 0, 1.0, 1.0); //left side\r\n  }\r\n  if (type === \"SEMI_DETACHED\") {\r\n    // texture\r\n    houseMat.diffuseTexture = new BABYLON.Texture(\r\n      \"./cubehouse_semi_detached.png\"\r\n    );\r\n\r\n    // FaceUV\r\n    houseFaceUV[0] = new BABYLON.Vector4(0.6, 0, 1.0, 1.0); //rear face\r\n    houseFaceUV[1] = new BABYLON.Vector4(0.0, 0, 0.4, 1.0); //front face\r\n    houseFaceUV[2] = new BABYLON.Vector4(0.4, 0, 0.6, 1.0); //right side\r\n    houseFaceUV[3] = new BABYLON.Vector4(0.4, 0, 0.6, 1.0); //left side\r\n  }\r\n\r\n  const base = BABYLON.MeshBuilder.CreateBox(\"base\", {\r\n    height: 1,\r\n    width: 1,\r\n    depth: 1,\r\n    faceUV: houseFaceUV,\r\n    wrap: true,\r\n  });\r\n\r\n  base.position.y = height / 2;\r\n  base.scaling = new BABYLON.Vector3(width, height, depth);\r\n\r\n  base.material = houseMat;\r\n\r\n  return base;\r\n};\r\n\r\n// ROOF\r\nconst buildRoof = (width, height, depth) => {\r\n  // Material\r\n  const roofMat = new BABYLON.StandardMaterial(\"roofMat\");\r\n  roofMat.diffuseTexture = new BABYLON.Texture(\r\n    \"https://assets.babylonjs.com/environments/roof.jpg\"\r\n  );\r\n\r\n  // Roof shape => cylinder with triangle base\r\n  const roof = BABYLON.MeshBuilder.CreateCylinder(\"roof\", {\r\n    diameter: 1.5,\r\n    height: 1,\r\n    tessellation: 3,\r\n  });\r\n\r\n  // Scale and rotate to correct position\r\n  roof.scaling.x = height * 0.5;\r\n  roof.scaling.y = width * 1.1;\r\n  roof.scaling.z = depth;\r\n  roof.rotation.z = Math.PI / 2;\r\n  roof.position.y = height * 1.175;\r\n\r\n  roof.material = roofMat;\r\n\r\n  return roof;\r\n};\r\n\r\n// HOUSE\r\nconst buildHouse = (type, width, height, depth) => {\r\n  const base = buildBase(type, width, height, depth);\r\n  const roof = buildRoof(width, height, depth);\r\n\r\n  const house = BABYLON.Mesh.MergeMeshes(\r\n    [base, roof],\r\n    true,\r\n    false,\r\n    null,\r\n    false,\r\n    true\r\n  );\r\n\r\n  return house;\r\n};\r\n\r\n// GROUND\r\nconst buildGround = (width, height) => {\r\n  const ground = BABYLON.MeshBuilder.CreateGround(\"ground\", {\r\n    width: width,\r\n    height: height,\r\n  });\r\n\r\n  const groundMat = new BABYLON.StandardMaterial(\"groundMat\");\r\n\r\n  groundMat.diffuseColor = new BABYLON.Color3(0.15, 0.25, 0);\r\n  ground.material = groundMat; //Place the material property of the ground\r\n\r\n  return ground;\r\n};\r\n\r\n// // Render the scene\r\n// const scene = createScene(); //Call the createScene function\r\n\r\n// // Register a render loop to repeatedly render the scene\r\n// engine.runRenderLoop(function () {\r\n//   scene.render();\r\n// });\r\n\r\n// // Watch for browser/canvas resize events\r\n// window.addEventListener(\"resize\", function () {\r\n//   engine.resize();\r\n// });\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createWorld);\r\n\n\n//# sourceURL=webpack://babylonjs_training/./src/world.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;