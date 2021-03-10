import BaseScene from "./BaseScene";
import back from "./images/back.png";

class ScoreScene extends BaseScene {
  constructor(config) {
    super("ScoreScene", config);
    // super("ScoreScene", confifg);
  }

  prealod() {
    this.load.image("back", back);
  }

  create() {
    super.create();
    this.createBack();
    const bestScore = localStorage.getItem("bestScore");
    this.add.text(...this.screenCenter, `Best Score: ${bestScore || 0}`, this.fontOptions).setOrigin(0.5);
  }

  createBack() {
    const backButton = this.add.image(46, 76, "back").setInteractive().setScale(3).setOrigin(0);

    backButton.on("pointerdown", () => {
      this.scene.start("MenuScene");
    });
  }
}

export default ScoreScene;
