import Phaser from "phaser";
import { game, gameOptions } from "./game";
import BaseScene from "./BaseScene";
import MenuScene from "./MenuScene";
import PauseScene from "./PauseScene";
import playGame from "./playgame";
import resize from "./resize";
import scoreboard from "./ScoreBoard";
import ScoreScene from "./ScoreScene";
import "core-js/stable";
import "regenerator-runtime/runtime";
import "./index.scss";
import "./game.js";
import "./ScoreBoard";

class Game extends Phaser.Game {
  constructor() {
    super(game.config);
    const model = new Model();
    this.globals = {
      model,
      titleMusic: null,
      score: 0,
      count: 0,
      pilotName: null,
    };
    this.scene.add("BaseScene", BaseScene);
    this.scene.add("MenuScene", MenuScene);
    this.scene.add("PauseScene", PauseScene);
    this.scene.add("playGame", playGame);
    this.scene.add("resize", resize);
    this.scene.add("scoreboard", scoreboard);
    this.scene.add("ScoreScene", ScoreScene);
    this.scene.start("MenuScene");
  }
}
window.game = new Game();
