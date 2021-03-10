import Phaser from "phaser";
// import { game, gameOptions } from "./game";
import mountain from "./images/mountain.png";

class BaseScene extends Phaser.Scene {
  constructor(key, config) {
    super(key);
    this.config = config;
  }

  sayhello() {
    alert("hello made the basescen ");
  }

  create() {
    // this.add.image(0, 0, "sky").setOrigin(0);
    // this.scene.start("PlayGame");
  }
}

export default BaseScene;
