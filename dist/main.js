/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _images_player_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./images/player.png */ "./src/images/player.png");
/* harmony import */ var _images_platform_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./images/platform.png */ "./src/images/platform.png");
/* harmony import */ var _images_coin_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./images/coin.png */ "./src/images/coin.png");
/* harmony import */ var _images_fire_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./images/fire.png */ "./src/images/fire.png");
/* harmony import */ var _images_mountain_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./images/mountain.png */ "./src/images/mountain.png");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var game;




 // global game options

var gameOptions = {
  // platform speed range, in pixels per second
  platformSpeedRange: [300, 300],
  // mountain speed, in pixels per second
  mountainSpeed: 80,
  // spawn range, how far should be the rightmost platform from the right edge
  // before next platform spawns, in pixels
  spawnRange: [80, 300],
  // platform width range, in pixels
  platformSizeRange: [90, 300],
  // a height range between rightmost platform and next platform to be spawned
  platformHeightRange: [-5, 5],
  // a scale to be multiplied by platformHeightRange
  platformHeighScale: 20,
  // platform max and min height, as screen height ratio
  platformVerticalLimit: [0.4, 0.8],
  // player gravity
  playerGravity: 900,
  // player jump force
  jumpForce: 400,
  // player starting X position
  playerStartPosition: 200,
  // consecutive jumps allowed
  jumps: 2,
  // % of probability a coin appears on the platform
  coinPercent: 25,
  // % of probability a fire appears on the platform
  firePercent: 25
};

window.onload = function () {
  // object containing configuration options
  var gameConfig = {
    type: Phaser.AUTO,
    width: 1334,
    height: 750,
    scene: [preloadGame, playGame],
    backgroundColor: 0x0c88c7,
    // physics settings
    physics: {
      "default": "arcade"
    }
  };
  game = new Phaser.Game(gameConfig);
  window.focus();
  resize();
  window.addEventListener("resize", resize, false);
}; // preloadGame scene


var preloadGame = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(preloadGame, _Phaser$Scene);

  var _super = _createSuper(preloadGame);

  function preloadGame() {
    _classCallCheck(this, preloadGame);

    return _super.call(this, "PreloadGame");
  }

  _createClass(preloadGame, [{
    key: "preload",
    value: function preload() {
      this.load.image("platform", {
        platform: _images_platform_png__WEBPACK_IMPORTED_MODULE_1__
      }); // player is a sprite sheet made by 24x48 pixels

      this.load.spritesheet("player", {
        player: _images_player_png__WEBPACK_IMPORTED_MODULE_0__
      }, {
        frameWidth: 24,
        frameHeight: 48
      }); // the coin is a sprite sheet made by 20x20 pixels

      this.load.spritesheet("coin", {
        coin: _images_coin_png__WEBPACK_IMPORTED_MODULE_2__
      }, {
        frameWidth: 20,
        frameHeight: 20
      }); // the firecamp is a sprite sheet made by 32x58 pixels

      this.load.spritesheet("fire", {
        fire: _images_fire_png__WEBPACK_IMPORTED_MODULE_3__
      }, {
        frameWidth: 40,
        frameHeight: 70
      }); // mountains are a sprite sheet made by 512x512 pixels

      this.load.spritesheet("mountain", {
        mountain: _images_mountain_png__WEBPACK_IMPORTED_MODULE_4__
      }, {
        frameWidth: 512,
        frameHeight: 512
      });
    }
  }, {
    key: "create",
    value: function create() {
      // setting player animation
      this.anims.create({
        key: "run",
        frames: this.anims.generateFrameNumbers("player", {
          start: 0,
          end: 1
        }),
        frameRate: 8,
        repeat: -1
      }); // setting coin animation

      this.anims.create({
        key: "rotate",
        frames: this.anims.generateFrameNumbers("coin", {
          start: 0,
          end: 5
        }),
        frameRate: 15,
        yoyo: true,
        repeat: -1
      }); // setting fire animation

      this.anims.create({
        key: "burn",
        frames: this.anims.generateFrameNumbers("fire", {
          start: 0,
          end: 4
        }),
        frameRate: 15,
        repeat: -1
      });
      this.scene.start("PlayGame");
    }
  }]);

  return preloadGame;
}(Phaser.Scene); // playGame scene


var playGame = /*#__PURE__*/function (_Phaser$Scene2) {
  _inherits(playGame, _Phaser$Scene2);

  var _super2 = _createSuper(playGame);

  function playGame() {
    _classCallCheck(this, playGame);

    return _super2.call(this, "PlayGame");
  }

  _createClass(playGame, [{
    key: "create",
    value: function create() {
      // group with all active mountains.
      this.mountainGroup = this.add.group(); // group with all active platforms.

      this.platformGroup = this.add.group({
        // once a platform is removed, it's added to the pool
        removeCallback: function removeCallback(platform) {
          platform.scene.platformPool.add(platform);
        }
      }); // platform pool

      this.platformPool = this.add.group({
        // once a platform is removed from the pool, it's added to the active platforms group
        removeCallback: function removeCallback(platform) {
          platform.scene.platformGroup.add(platform);
        }
      }); // group with all active coins.

      this.coinGroup = this.add.group({
        // once a coin is removed, it's added to the pool
        removeCallback: function removeCallback(coin) {
          coin.scene.coinPool.add(coin);
        }
      }); // coin pool

      this.coinPool = this.add.group({
        // once a coin is removed from the pool, it's added to the active coins group
        removeCallback: function removeCallback(coin) {
          coin.scene.coinGroup.add(coin);
        }
      }); // group with all active firecamps.

      this.fireGroup = this.add.group({
        // once a firecamp is removed, it's added to the pool
        removeCallback: function removeCallback(fire) {
          fire.scene.firePool.add(fire);
        }
      }); // fire pool

      this.firePool = this.add.group({
        // once a fire is removed from the pool, it's added to the active fire group
        removeCallback: function removeCallback(fire) {
          fire.scene.fireGroup.add(fire);
        }
      }); // adding a mountain

      this.addMountains(); // keeping track of added platforms

      this.addedPlatforms = 0; // number of consecutive jumps made by the player so far

      this.playerJumps = 0; // adding a platform to the game, the arguments are platform width, x position and y position

      this.addPlatform(game.config.width, game.config.width / 2, game.config.height * gameOptions.platformVerticalLimit[1]); // adding the player;

      this.player = this.physics.add.sprite(gameOptions.playerStartPosition, game.config.height * 0.7, "player");
      this.player.setGravityY(gameOptions.playerGravity);
      this.player.setDepth(2); // the player is not dying

      this.dying = false; // setting collisions between the player and the platform group

      this.platformCollider = this.physics.add.collider(this.player, this.platformGroup, function () {
        // play "run" animation if the player is on a platform
        if (!this.player.anims.isPlaying) {
          this.player.anims.play("run");
        }
      }, null, this); // setting collisions between the player and the coin group

      this.physics.add.overlap(this.player, this.coinGroup, function (player, coin) {
        this.tweens.add({
          targets: coin,
          y: coin.y - 100,
          alpha: 0,
          duration: 800,
          ease: "Cubic.easeOut",
          callbackScope: this,
          onComplete: function onComplete() {
            this.coinGroup.killAndHide(coin);
            this.coinGroup.remove(coin);
          }
        });
      }, null, this); // setting collisions between the player and the fire group

      this.physics.add.overlap(this.player, this.fireGroup, function (player, fire) {
        this.dying = true;
        this.player.anims.stop();
        this.player.setFrame(2);
        this.player.body.setVelocityY(-200);
        this.physics.world.removeCollider(this.platformCollider);
      }, null, this); // checking for input

      this.input.on("pointerdown", this.jump, this);
    } // adding mountains

  }, {
    key: "addMountains",
    value: function addMountains() {
      var rightmostMountain = this.getRightmostMountain();

      if (rightmostMountain < game.config.width * 2) {
        var _mountain = this.physics.add.sprite(rightmostMountain + Phaser.Math.Between(100, 350), game.config.height + Phaser.Math.Between(0, 100), "mountain");

        _mountain.setOrigin(0.5, 1);

        _mountain.body.setVelocityX(gameOptions.mountainSpeed * -1);

        this.mountainGroup.add(_mountain);

        if (Phaser.Math.Between(0, 1)) {
          _mountain.setDepth(1);
        }

        _mountain.setFrame(Phaser.Math.Between(0, 3));

        this.addMountains();
      }
    } // getting rightmost mountain x position

  }, {
    key: "getRightmostMountain",
    value: function getRightmostMountain() {
      var rightmostMountain = -200;
      this.mountainGroup.getChildren().forEach(function (mountain) {
        rightmostMountain = Math.max(rightmostMountain, mountain.x);
      });
      return rightmostMountain;
    } // the core of the script: platform are added from the pool or created on the fly

  }, {
    key: "addPlatform",
    value: function addPlatform(platformWidth, posX, posY) {
      this.addedPlatforms++;
      var platform;

      if (this.platformPool.getLength()) {
        platform = this.platformPool.getFirst();
        platform.x = posX;
        platform.y = posY;
        platform.active = true;
        platform.visible = true;
        this.platformPool.remove(platform);
        var newRatio = platformWidth / platform.displayWidth;
        platform.displayWidth = platformWidth;
        platform.tileScaleX = 1 / platform.scaleX;
      } else {
        platform = this.add.tileSprite(posX, posY, platformWidth, 32, "platform");
        this.physics.add.existing(platform);
        platform.body.setImmovable(true);
        platform.body.setVelocityX(Phaser.Math.Between(gameOptions.platformSpeedRange[0], gameOptions.platformSpeedRange[1]) * -1);
        platform.setDepth(2);
        this.platformGroup.add(platform);
      }

      this.nextPlatformDistance = Phaser.Math.Between(gameOptions.spawnRange[0], gameOptions.spawnRange[1]); // if this is not the starting platform...

      if (this.addedPlatforms > 1) {
        // is there a coin over the platform?
        if (Phaser.Math.Between(1, 100) <= gameOptions.coinPercent) {
          if (this.coinPool.getLength()) {
            var _coin = this.coinPool.getFirst();

            _coin.x = posX;
            _coin.y = posY - 96;
            _coin.alpha = 1;
            _coin.active = true;
            _coin.visible = true;
            this.coinPool.remove(_coin);
          } else {
            var _coin2 = this.physics.add.sprite(posX, posY - 96, "coin");

            _coin2.setImmovable(true);

            _coin2.setVelocityX(platform.body.velocity.x);

            _coin2.anims.play("rotate");

            _coin2.setDepth(2);

            this.coinGroup.add(_coin2);
          }
        } // is there a fire over the platform?


        if (Phaser.Math.Between(1, 100) <= gameOptions.firePercent) {
          if (this.firePool.getLength()) {
            var _fire = this.firePool.getFirst();

            _fire.x = posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth);
            _fire.y = posY - 46;
            _fire.alpha = 1;
            _fire.active = true;
            _fire.visible = true;
            this.firePool.remove(_fire);
          } else {
            var _fire2 = this.physics.add.sprite(posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth), posY - 46, "fire");

            _fire2.setImmovable(true);

            _fire2.setVelocityX(platform.body.velocity.x);

            _fire2.setSize(8, 2, true);

            _fire2.anims.play("burn");

            _fire2.setDepth(2);

            this.fireGroup.add(_fire2);
          }
        }
      }
    } // the player jumps when on the ground, or once in the air as long as there are jumps left and the first jump was on the ground
    // and obviously if the player is not dying

  }, {
    key: "jump",
    value: function jump() {
      if (!this.dying && (this.player.body.touching.down || this.playerJumps > 0 && this.playerJumps < gameOptions.jumps)) {
        if (this.player.body.touching.down) {
          this.playerJumps = 0;
        }

        this.player.setVelocityY(gameOptions.jumpForce * -1);
        this.playerJumps++; // stops animation

        this.player.anims.stop();
      }
    }
  }, {
    key: "update",
    value: function update() {
      // game over
      if (this.player.y > game.config.height) {
        this.scene.start("PlayGame");
      }

      this.player.x = gameOptions.playerStartPosition; // recycling platforms

      var minDistance = game.config.width;
      var rightmostPlatformHeight = 0;
      this.platformGroup.getChildren().forEach(function (platform) {
        var platformDistance = game.config.width - platform.x - platform.displayWidth / 2;

        if (platformDistance < minDistance) {
          minDistance = platformDistance;
          rightmostPlatformHeight = platform.y;
        }

        if (platform.x < -platform.displayWidth / 2) {
          this.platformGroup.killAndHide(platform);
          this.platformGroup.remove(platform);
        }
      }, this); // recycling coins

      this.coinGroup.getChildren().forEach(function (coin) {
        if (coin.x < -coin.displayWidth / 2) {
          this.coinGroup.killAndHide(coin);
          this.coinGroup.remove(coin);
        }
      }, this); // recycling fire

      this.fireGroup.getChildren().forEach(function (fire) {
        if (fire.x < -fire.displayWidth / 2) {
          this.fireGroup.killAndHide(fire);
          this.fireGroup.remove(fire);
        }
      }, this); // recycling mountains

      this.mountainGroup.getChildren().forEach(function (mountain) {
        if (mountain.x < -mountain.displayWidth) {
          var rightmostMountain = this.getRightmostMountain();
          mountain.x = rightmostMountain + Phaser.Math.Between(100, 350);
          mountain.y = game.config.height + Phaser.Math.Between(0, 100);
          mountain.setFrame(Phaser.Math.Between(0, 3));

          if (Phaser.Math.Between(0, 1)) {
            mountain.setDepth(1);
          }
        }
      }, this); // adding new platforms

      if (minDistance > this.nextPlatformDistance) {
        var nextPlatformWidth = Phaser.Math.Between(gameOptions.platformSizeRange[0], gameOptions.platformSizeRange[1]);
        var platformRandomHeight = gameOptions.platformHeighScale * Phaser.Math.Between(gameOptions.platformHeightRange[0], gameOptions.platformHeightRange[1]);
        var nextPlatformGap = rightmostPlatformHeight + platformRandomHeight;
        var minPlatformHeight = game.config.height * gameOptions.platformVerticalLimit[0];
        var maxPlatformHeight = game.config.height * gameOptions.platformVerticalLimit[1];
        var nextPlatformHeight = Phaser.Math.Clamp(nextPlatformGap, minPlatformHeight, maxPlatformHeight);
        this.addPlatform(nextPlatformWidth, game.config.width + nextPlatformWidth / 2, nextPlatformHeight);
      }
    }
  }]);

  return playGame;
}(Phaser.Scene);

function resize() {
  var canvas = document.querySelector("canvas");
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var windowRatio = windowWidth / windowHeight;
  var gameRatio = game.config.width / game.config.height;

  if (windowRatio < gameRatio) {
    canvas.style.width = windowWidth + "px";
    canvas.style.height = windowWidth / gameRatio + "px";
  } else {
    canvas.style.width = windowHeight * gameRatio + "px";
    canvas.style.height = windowHeight + "px";
  }
}

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/images/coin.png":
/*!*****************************!*\
  !*** ./src/images/coin.png ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/6e1e9e157c28a9046cd6.png";

/***/ }),

/***/ "./src/images/fire.png":
/*!*****************************!*\
  !*** ./src/images/fire.png ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/cded3e2787d135c191b8.png";

/***/ }),

/***/ "./src/images/mountain.png":
/*!*********************************!*\
  !*** ./src/images/mountain.png ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/b43f89ffc918f8237011.png";

/***/ }),

/***/ "./src/images/platform.png":
/*!*********************************!*\
  !*** ./src/images/platform.png ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/1979f8df89f1d25dfbf6.png";

/***/ }),

/***/ "./src/images/player.png":
/*!*******************************!*\
  !*** ./src/images/player.png ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "images/75f25adb639e3827973d.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.scss */ "./src/index.scss");
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game.js */ "./src/game.js");


})();

/******/ })()
;
//# sourceMappingURL=main.js.map