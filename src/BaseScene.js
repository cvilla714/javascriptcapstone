import Phaser from "phaser";
import { game, gameOptions } from "./game";

class BaseScene extends Phaser.Scene {
  constructor(key, config) {
    super(key);
    this.config = config;
    this.screenCenter = [game.config.width / 2, game.config.height / 2];
    this.fontSize = 55;
    this.lineHeight = 65;
    this.fontOptions = { fontSize: `${this.fontSize}px`, fill: `#fff` };
  }

  create() {
    // this.add.image(0, 0, "sky").setOrigin(0);
    // this.scene.start("PlayGame");
  }

  createMenu(menu, setupMenuEvents) {
    let lastMenuPositionY = 0;
    menu.forEach((menuItem) => {
      const menuPosition = [this.screenCenter[0], this.screenCenter[1] + lastMenuPositionY];
      menuItem.textGO = this.add.text(...menuPosition, menuItem.text, this.fontOptions).setOrigin(0.5, 1);
      lastMenuPositionY += this.lineHeight;
      setupMenuEvents(menuItem);
    });
  }
}

export default BaseScene;
