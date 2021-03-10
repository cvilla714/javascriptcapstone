import Phaser from "phaser";
import { game, gameOptions } from "./game";
import mountain from "./images/mountain.png";

class BaseScene extends Phaser.Scene {
  constructor(key, config) {
    super(key);
    this.config = config;
    this.screenCenter = [game.config.width / 2, game.config.height / 2];
  }

  create() {
    // this.add.image(0, 0, "sky").setOrigin(0);
    // this.scene.start("PlayGame");
  }

  createMenu(menu) {
    let lastMenuPositionY = 0;
    menu.forEach((menuItem) => {
      const menuPosition = [this.screenCenter[0], this.screenCenter[1] + lastMenuPositionY];
      this.add.text(...menuPosition, menuItem.text, { fontSize: "32px", fill: "#CD00ff" }).setOrigin(0.5, 1);
      lastMenuPositionY += 42;
    });
  }
}

export default BaseScene;
