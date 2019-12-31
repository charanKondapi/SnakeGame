/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/Board.js":
/*!*************************!*\
  !*** ./src/js/Board.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// constants\n\nBoard.BORDER_COLOR = \"#000\";\nBoard.BORDER_STYLE = \"solid\";\nBoard.BORDER_WIDTH = 5;\nBoard.BACKGROUND_COLOR = \"#efefef\";\nBoard.CELL_BORDER_COLOR = \"#efefef\";\nBoard.CELL_WIDTH = 20;\nBoard.CELL_HEIGHT = 20;\n\nfunction Board( width, height ){\n    this.width = width;\n    this.height = height;\n    this.foodPosition = {};\n}\n\nBoard.prototype.drawBoard = function drawBoard(){\n\n    if( this.width % Board.CELL_WIDTH !== 0 || this.height % Board.CELL_HEIGHT !== 0 ){\n        throw new Error(`width and height should devicable by ${ Board.CELL_WIDTH }, ${ Board.CELL_HEIGHT } `);\n    }\n\n    const rootElement = document.getElementById('game');\n\n    // ADDING STYLES FOR BOARD\n    const boardElement = document.createElement('div');\n          boardElement.style.width = `${ this.width }px`;\n          boardElement.style.height = `${ this.height }px`;\n          boardElement.style.borderWidth = `${Board.BORDER_WIDTH}px`;\n          boardElement.style.borderColor = Board.BORDER_COLOR;\n          boardElement.style.borderStyle = Board.BORDER_STYLE;\n          boardElement.style.backgroundColor = Board.BACKGROUND_COLOR;\n          boardElement.style.display = \"flex\";\n          boardElement.style.flexWrap = \"wrap\";\n    \n    const { numberOfRows,  numberOfColumns } = this.getRowsAndCols();\n\n    for( let row = 0; row < numberOfRows; row++ ){\n        for( let col = 0; col < numberOfColumns; col++ ){\n            // DIVIDE THE BOARD INTO ROWS AND COLUMNS\n            const cell = document.createElement('div');\n            cell.style.width = `${ Board.CELL_WIDTH }px`;\n            cell.style.height = `${ Board.CELL_HEIGHT }px`;\n            cell.setAttribute('data-x', col );\n            cell.setAttribute('data-y', row );\n            cell.style.border = `1px solid ${ Board.CELL_BORDER_COLOR }`;\n            cell.style.boxSizing = \"border-box\";\n\n            boardElement.appendChild( cell );\n        }\n    }\n\n\n    rootElement.appendChild( boardElement );\n}\n\nBoard.prototype.placeFood = function placeFood( snakePosition ){\n\n    const { numberOfRows : rows , numberOfColumns : cols  }  = this.getRowsAndCols();\n    // const foodPosition = { x : Math.round( Math.random() * cols - 1 ), y : Math.round( Math.random() * rows - 1 ) };\n    const foodPosition = this.newPlaceForFood( snakePosition, cols, rows );\n\n    console.log( foodPosition );\n\n    const ele = document.querySelectorAll(`[data-x=\"${ foodPosition.x }\"][data-y=\"${ foodPosition.y }\"]`)[0];\n          if(ele) ele.style.backgroundColor = \"red\";\n\n    this.foodPosition = foodPosition;\n}\n\nBoard.prototype.newPlaceForFood = function newPlaceForFood( snakePosition, cols, rows ){\n    const newPlace = { x : Math.abs(Math.round( Math.random() * cols - 1 )), y : Math.abs(Math.round( Math.random() * rows - 1 )) };\n    return snakePosition.some( ({ Xpos, Ypos }) => Xpos === newPlace.x && Ypos === newPlace.y ) \n            ? newPlaceForFood(snakePosition, cols, rows )\n            : newPlace;\n}\n\nBoard.prototype.getRowsAndCols = function getRowsAndCols(){\n    return {\n        numberOfRows : this.height / Board.CELL_HEIGHT,\n        numberOfColumns : this.width / Board.CELL_WIDTH\n    }\n}\n\nBoard.prototype.stopGame = function stopGame( timer ){\n    clearInterval( timer );\n}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Board);\n\n//# sourceURL=webpack:///./src/js/Board.js?");

/***/ }),

/***/ "./src/js/Snake.js":
/*!*************************!*\
  !*** ./src/js/Snake.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Board */ \"./src/js/Board.js\");\n\n\nSnake.COLOR = \"#666\";\nSnake.DIRECTION = \"right\";\n\nfunction Snake(){\n    this.snakePosition = [{ x : 0, y : 0 }, { x : 1, y : 0 }, { x : 2, y : 0 }];\n    this.prevSnakePosition = [];\n}\n\nSnake.prototype.drawSnake = function drawSnake(){\n    this.clearSnake();\n    this.snakePosition.forEach(({ x, y }) => {\n        const ele = document.querySelectorAll(`[data-x=\"${ x }\"][data-y=\"${ y }\"]`)[0];\n                if( ele ) ele.style.backgroundColor = Snake.COLOR;\n                if( ele ) ele.style.transition = \"all 0.005s ease-in-out\";\n    })\n}\n\nSnake.prototype.clearSnake = function clearSnake(){\n    this.prevSnakePosition.forEach(({ x, y}) => {\n        const ele = document.querySelectorAll(`[data-x=\"${ x }\"][data-y=\"${ y }\"]`)[0];\n              if( ele ) ele.style.backgroundColor = _Board__WEBPACK_IMPORTED_MODULE_0__[\"default\"].BACKGROUND_COLOR;\n              if( ele ) ele.style.transition = \"all 0.005s ease-in-out\";\n    })\n}\n\nSnake.prototype.move = function move( timer, snakeBoard, python ){\n    this.prevSnakePosition = [ ...this.snakePosition ];\n    let snakeLength = this.snakePosition.length;\n    let head = this.snakePosition[ snakeLength - 1 ];\n    let newHead = {};\n\n    const { numberOfRows, numberOfColumns }  = snakeBoard.getRowsAndCols();\n\n    switch( Snake.DIRECTION ){\n        case 'right' : \n            newHead = { x : head.x + 1, y : head.y };\n            break;\n        case 'left' : \n            newHead = { x : head.x - 1, y : head.y };\n            break;\n        case 'down' :\n            newHead = { x : head.x, y : head.y + 1 };\n            break;\n        case 'up' :\n            newHead = { x : head.x, y : head.y - 1 };\n            break;\n    };\n\n    if( newHead.x == snakeBoard.foodPosition.x && newHead.y == snakeBoard.foodPosition.y ){\n        this.snakePosition.unshift({ x: this.snakePosition[0].x - 1, y : head.y});\n        snakeBoard.placeFood( python.snakePosition );\n    }\n\n    try {\n        if( newHead.x >= numberOfColumns  || newHead.y >= numberOfRows ){\n            throw new Error(\"stop\");\n        }\n    }\n    catch( e ){\n        snakeBoard.stopGame( timer )\n    }\n\n    this.snakePosition.push( newHead );\n    this.snakePosition.shift();\n    this.drawSnake();\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Snake);\n\n//# sourceURL=webpack:///./src/js/Snake.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Board */ \"./src/js/Board.js\");\n/* harmony import */ var _Snake__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Snake */ \"./src/js/Snake.js\");\n\n\n\nconst snakeBoard = new _Board__WEBPACK_IMPORTED_MODULE_0__[\"default\"](500,500);\n      snakeBoard.drawBoard();\n\nconst snake = new _Snake__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n      snake.drawSnake();\n\nsnakeBoard.placeFood( snake.snakePosition );\n\n\nconst timer = setInterval( () => snake.move( timer, snakeBoard, snake ), 200 );\n\n\ndocument.addEventListener('keydown',function( ev ){\n    setTimeout(()=>{\n        switch( ev.keyCode ){\n            case 37 :\n                _Snake__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DIRECTION = \"left\";\n                break;\n            case 38 : \n                _Snake__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DIRECTION = \"up\";\n                break;\n            case 39 : \n                _Snake__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DIRECTION = \"right\";\n                break;\n            case 40 : \n                _Snake__WEBPACK_IMPORTED_MODULE_1__[\"default\"].DIRECTION = \"down\";\n                break;\n        }\n    },0)\n});\n\n\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ })

/******/ });