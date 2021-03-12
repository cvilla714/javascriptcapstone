import Phaser from "phaser";
import preloadGame from "./preload";
import playGame from "./playgame";
import resize from "./resize";
import MenuScene from "./MenuScene";
import ScoreScene from "./ScoreScene";
import PauseScene from "./PauseScene";

let game;

// global game options
let gameOptions = {
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
  jumps: 3,

  // % of probability a coin appears on the platform
  coinPercent: 25,

  // % of probability a fire appears on the platform
  firePercent: 25,
};

window.onload = function () {
  // object containing configuration options
  let gameConfig = {
    type: Phaser.AUTO,
    width: 1334,
    height: 750,
    scene: [preloadGame, MenuScene, ScoreScene, playGame, PauseScene],
    backgroundColor: 0x0c88c7,

    // physics settings
    physics: {
      default: "arcade",
    },
  };
  game = new Phaser.Game(gameConfig);
  window.focus();
  resize();
  window.addEventListener("resize", resize, false);
};

// preloadGame scene

// playGame scene

// resize
export { game, gameOptions };
