import BaseScene from "./BaseScene";
import back from "./images/back.png";
import scoreboard from "./ScoreBoard";

class ScoreScene extends BaseScene {
  constructor(config) {
    super("ScoreScene", config);
    // super("ScoreScene", confifg);
  }

  preload() {
    this.load.image("back", back);
  }

  create() {
    super.create();
    this.createBack();
    // const bestScore = localStorage.getItem("bestScore");
    const bestScore = scoreboard();
    console.log(bestScore);
    // bestScore.then((data) => console.log(data));
    // const bestScore = ScoreList();
    // this.add.text(...this.screenCenter, `Best Score: ${bestScore || 0}`, this.fontOptions).setOrigin(0.5);
    let lastMenuPositionY = 0;

    // menu.forEach((menuItem) => {
    //   const menuPosition = [this.screenCenter[0], this.screenCenter[1] + lastMenuPositionY];
    //   menuItem.textGO = this.add.text(...menuPosition, menuItem.text, this.fontOptions).setOrigin(0.5, 1);
    //   lastMenuPositionY += this.lineHeight;
    //   setupMenuEvents(menuItem);

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
