/* eslint-disable import/no-cycle, import/no-mutable-exports,func-names */
import Phaser from "phaser";
import preloadGame from "./preload";
import playGame from "./playgame";
import resize from "./resize";
import MenuScene from "./MenuScene";
import ScoreScene from "./ScoreScene";
import PauseScene from "./PauseScene";

let game;

const gameOptions = {
  platformSpeedRange: [300, 300],
  mountainSpeed: 80,
  spawnRange: [80, 300],
  platformSizeRange: [90, 300],
  platformHeightRange: [-5, 5],
  platformHeighScale: 20,
  platformVerticalLimit: [0.4, 0.8],
  playerGravity: 900,
  jumpForce: 400,
  playerStartPosition: 200,
  jumps: 3,
  coinPercent: 25,
  firePercent: 25,
};

window.onload = function () {
  const gameConfig = {
    type: Phaser.AUTO,
    width: 1334,
    height: 750,
    scene: [preloadGame, MenuScene, ScoreScene, playGame, PauseScene],
    backgroundColor: 0x0c88c7,
    physics: {
      default: "arcade",
    },
  };
  game = new Phaser.Game(gameConfig);
  window.focus();
  resize();
  window.addEventListener("resize", resize, false);
};

export { game, gameOptions };
