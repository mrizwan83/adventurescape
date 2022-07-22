/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function() {

eval("const canvas = document.querySelector('canvas');\r\nconst c = canvas.getContext('2d');\r\n\r\ncanvas.width = 1024;\r\ncanvas.height = 576;\r\n\r\nc.fillRect(0, 0, canvas.width, canvas.height);\r\n\r\nconst gravity = 0.7;\r\n\r\nclass Sprite {\r\n  constructor({position, velocity}) {\r\n    this.position = position;\r\n    this.velocity = velocity;\r\n    this.height = 150;\r\n    this.lastKey\r\n  }\r\n\r\n  draw() {\r\n    c.fillStyle = 'blue';\r\n    c.fillRect(this.position.x, this.position.y, 50, this.height);\r\n  }\r\n\r\n\r\n  update() {\r\n    this.draw();\r\n    this.position.x += this.velocity.x;\r\n    this.position.y += this.velocity.y;\r\n\r\n    if (this.position.y + this.height + this.velocity.y >= canvas.height) {\r\n      this.velocity.y = 0;\r\n    } else {\r\n      this.velocity.y += gravity;\r\n    }\r\n  }\r\n\r\n\r\n}\r\n\r\nconst player = new Sprite({\r\n  position: {\r\n  x: 100,\r\n  y: 100\r\n  },\r\n  velocity: {\r\n    x: 0,\r\n    y: 10\r\n  }\r\n});\r\n\r\nconst npc = new Sprite({\r\n  position: {\r\n    x: 850,\r\n    y: 100\r\n  },\r\n  velocity: {\r\n    x: 0,\r\n    y: 10\r\n  }\r\n});\r\n\r\n\r\nconsole.log(player);\r\n\r\nconst keys = {\r\n  a: {\r\n    pressed: false\r\n  },\r\n  d: {\r\n    pressed: false\r\n  },\r\n  w: {\r\n    pressed: false\r\n  },\r\n  ArrowRight: {\r\n    pressed: false\r\n  },\r\n  ArrowLeft: {\r\n    pressed: false\r\n  }\r\n}\r\n\r\nlet lastKey;\r\n\r\nconsole.log(npc);\r\n\r\n\r\nfunction animate() {\r\n  window.requestAnimationFrame(animate);\r\n  c.fillStyle = 'black';\r\n  c.fillRect(0, 0, canvas.width, canvas.height);\r\n  player.update();\r\n  npc.update();\r\n\r\n  player.velocity.x = 0;\r\n  npc.velocity.x = 0;\r\n  if (keys.a.pressed && lastKey === 'a') {\r\n    player.velocity.x = -1;\r\n  } else if (keys.d.pressed && lastKey === 'd') {\r\n    player.velocity.x = 1;\r\n  }\r\n  ///npc movement\r\n  if (keys.ArrowLeft.pressed && npc.lastKey === 'ArrowLeft') {\r\n    npc.velocity.x = -1;\r\n  } else if (keys.ArrowRight.pressed && npc.lastKey === 'ArrowRight') {\r\n    npc.velocity.x = 1;\r\n  }\r\n}\r\n\r\n\r\nanimate();\r\n\r\n\r\n// const npc = new Sprite({\r\n//   position: {\r\n//     x: 400,\r\n//     y: 100\r\n//   },\r\n//   velocity: {\r\n//     x: 0,\r\n//     y: 0\r\n//   }\r\n// });\r\n// player.draw();\r\n// console.log(player);\r\n\r\n\r\n// function render() {\r\n//   window.requestAnimationFrame(render);\r\n//   c.fillStyle = 'black';\r\n//   c.fillRect(0, 0, canvas.width, canvas.height)\r\n//   player.update();\r\n//   npc.update();\r\n\r\n//   player.velocity.x = 0;\r\n//   npc.velocity.x = 0;\r\n\r\n//   if (keys.a.pressed && player.lastKey === 'a') {\r\n//     player.velocity.x = -5;\r\n//   } else if (keys.d.pressed && player.lastKey === 'd') {\r\n//     player.velocity.x = 1;\r\n//   }\r\n\r\n//   if (keys.ArrowLeft.pressed && npc.lastKey === 'ArrowLeft') {\r\n//     player.velocity.x = -1;\r\n//   } else if (keys.ArrowRight.pressed && npc.lastKey === 'ArrowRight') {\r\n//     player.velocity.x = 1;\r\n//   }\r\n// }\r\n\r\n// render();\r\n\r\nwindow.addEventListener('keydown', (event) => {\r\n  console.log(event.key);\r\n  switch (event.key) {\r\n    case ('d'):\r\n      // player.velocity.x = 1;\r\n      keys.d.pressed = true;\r\n      lastKey = 'd'\r\n      // player.lastKey = 'd';\r\n      break\r\n    case ('a'):\r\n      // player.velocity.x = -1;\r\n      keys.a.pressed = true;\r\n      lastKey = 'a'\r\n      // player.lastKey = 'd';\r\n      break\r\n    case ('w'):\r\n      player.velocity.y = -10;\r\n      break\r\n\r\n    case ('ArrowRight'):\r\n      // player.velocity.x = 1;\r\n      keys.ArrowRight.pressed = true;\r\n      npc.lastKey = 'ArrowRight'\r\n      // player.lastKey = 'd';\r\n      break\r\n    case ('ArrowLeft'):\r\n      // player.velocity.x = -1;\r\n      keys.ArrowLeft.pressed = true;\r\n      npc.lastKey = 'ArrowLeft'\r\n      // player.lastKey = 'd';\r\n      break\r\n    case ('ArrowUp'):\r\n      npc.velocity.y = -10;\r\n      break\r\n  }\r\n})\r\n\r\nwindow.addEventListener('keyup', (event) => {\r\n  console.log(event.key);\r\n  switch (event.key) {\r\n    case ('d'):\r\n      // player.velocity.x = 0;\r\n      keys.d.pressed = false;\r\n      // player.lastKey = 'd';\r\n      break\r\n    case ('a'):\r\n      // player.velocity.x = 0;\r\n      keys.a.pressed = false;\r\n      // player.lastKey = 'd';\r\n      break\r\n    \r\n\r\n      //npc\r\n    case ('ArrowRight'):\r\n      // player.velocity.x = 0;\r\n      keys.ArrowRight.pressed = false;\r\n      // player.lastKey = 'd';\r\n      break\r\n    case ('ArrowLeft'):\r\n      // player.velocity.x = 0;\r\n      keys.ArrowLeft.pressed = false;\r\n      // player.lastKey = 'd';\r\n      break\r\n  }\r\n})\r\n\n\n//# sourceURL=webpack://adventurescape/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;