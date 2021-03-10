// import Phaser from "phaser";
// import mountain from "./images/mountain.png";
import BaseScene from "./BaseScene";

// class MenuScene extends Phaser.Scene {
class MenuScene extends BaseScene {
  constructor(config) {
    super("MenuScene", config);
    // this.config = config;
  }

  preload() {
    // this.load.image("sky", mountain);
  }

  create() {
    super.create();
    // this.sayhello();
    this.scene.start("PlayGame");
  }
}

export default MenuScene;
