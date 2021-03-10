// import Phaser from "phaser";
// import mountain from "./images/mountain.png";
import BaseScene from "./BaseScene";

// class MenuScene extends Phaser.Scene {
class MenuScene extends BaseScene {
  constructor(config) {
    super("MenuScene", config);

    this.menu = [
      { scene: "PlayGame", text: "Play" },
      { scene: "ScoreScene", text: "Score" },
      { scene: null, text: "Exit" },
    ];
  }

  preload() {
    // this.load.image("sky", mountain);
  }

  create() {
    super.create();
    this.createMenu(this.menu);
  }
}

export default MenuScene;
