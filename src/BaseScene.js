import Phaser from "phaser";
// import { game } from "./game";

class BaseScene extends Phaser.Scene {
  constructor(key, config) {
    super(key);
    this.config = config;
    // this.screenCenter = [game.config.width / 2, game.config.height / 2];
    this.screenCenter = [1334 / 2, 750 / 2];
    // this.resumeScreenCenter = [game.config.width / 4, game.config.height / 4];
    this.resumeScreenCenter = [1334 / 4, 750 / 4];
    this.fontSize = 55;
    this.lineHeight = 65;
    this.fontOptions = { fontSize: `${this.fontSize}px`, fill: `#fff` };
    this.fontResume = { fontSize: `${this.fontSize}px`, fill: `#f5ef42` };
  }

  create() {}

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
