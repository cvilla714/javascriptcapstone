import BaseScene from "./BaseScene";
import back from "./images/back.png";
import scoreboard from "./ScoreBoard";
import { game, gameOptions } from "./game";
class ScoreScene extends BaseScene {
  constructor(config) {
    super("ScoreScene", config);
  }

  preload() {
    this.load.image("back", back);
  }

  create() {
    super.create();
    this.createBack();
    const bestScore = scoreboard();
    console.log(bestScore);
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
    const backButton = this.add.image(46, 76, "back").setInteractive().setScale(3).setOrigin(0);

    backButton.on("pointerdown", () => {
      this.scene.start("MenuScene");
    });
  }
}

export default ScoreScene;
