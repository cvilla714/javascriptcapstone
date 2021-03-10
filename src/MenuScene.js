import Phaser from "phaser";
import sky from "./images/sky.png";
// import BaseScene from "./BaseScene";
class MenuScene extends Phaser.Scene {
  constructor(config) {
    super("MenuScene");
    this.config = config;
  }

  preload() {
    // this.load.image("sky", sky);
  }

  create() {
    // this.add.image(0, 0, "sky").setOrigin(1);
    // super.create();
    this.scene.start("PlayGame");
  }
}

export default MenuScene;
