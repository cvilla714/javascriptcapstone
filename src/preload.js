import Phaser from "phaser";
import girlmove from "./images/spritesheet.png";
import platform from "./images/platform.png";
import coin from "./images/coin.png";
import fire from "./images/fire.png";
import mountain from "./images/mountain.png";
import music from "./images/DanceandJump.ogg";

class preloadGame extends Phaser.Scene {
  constructor() {
    super("PreloadGame");
  }

  preload() {
    this.load.audio("music", music);
    this.load.image("platform", platform);
    this.load.spritesheet("player", girlmove, {
      frameWidth: 130,
      frameHeight: 130,
    });
    this.load.spritesheet("coin", coin, {
      frameWidth: 20,
      frameHeight: 20,
    });
    this.load.spritesheet("fire", fire, {
      frameWidth: 40,
      frameHeight: 70,
    });
    this.load.spritesheet("mountain", mountain, {
      frameWidth: 512,
      frameHeight: 512,
    });
  }

  create() {
    this.music = this.sound.add("music");
    const musicConfig = {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    };
    this.music.play(musicConfig);
    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("player", {
        start: 0,
        end: 1,
      }),
      frameRate: 9,
      repeat: -1,
    });
    this.anims.create({
      key: "rotate",
      frames: this.anims.generateFrameNumbers("coin", {
        start: 0,
        end: 5,
      }),
      frameRate: 15,
      yoyo: true,
      repeat: -1,
    });
    this.anims.create({
      key: "burn",
      frames: this.anims.generateFrameNumbers("fire", {
        start: 0,
        end: 4,
      }),
      frameRate: 15,
      repeat: -1,
    });
    this.scene.start("MenuScene");
  }
}

export default preloadGame;
