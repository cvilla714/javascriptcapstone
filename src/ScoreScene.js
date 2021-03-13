/* eslint-disable array-callback-return */
import BaseScene from "./BaseScene";
import scoreboard from "./ScoreBoard";

class ScoreScene extends BaseScene {
  constructor(config) {
    super("ScoreScene", config);
  }

  preload() {
    this.load.image("back", "./images/back.png");
  }

  create() {
    super.create();
    this.createBack();
    const bestScore = scoreboard();
    let lastMenuPositionY = 0;
    bestScore.then((data) => {
      data.map(({ score, user }) => {
        const menuPosition = [this.screenCenter[0], this.screenCenter[1] + lastMenuPositionY];
        this.add.text(...menuPosition, `Best Score: ${score || 0} ${user}`, this.fontOptions).setOrigin(0.5);
        lastMenuPositionY += this.lineHeight;
      });
    });
  }

  createBack() {
    const backButton = this.add.text(46, 76, "back").setInteractive().setScale(3).setOrigin(0);

    backButton.on("pointerdown", () => {
      this.scene.start("MenuScene");
    });
  }
}

export default ScoreScene;
