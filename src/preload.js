import Phaser from "phaser";
// import girlmove from "./images/spritesheet.png";
// import platform from "./images/platform.png";
// import coin from "./images/coin.png";
// import fire from "./images/fire.png";
// import mountain from "./images/mountain.png";
// import music from "./DanceandJump.ogg";

class preloadGame extends Phaser.Scene {
  constructor() {
    super("PreloadGame");
  }
  preload() {
    this.load.audio("music", "./images/DanceandJump.ogg");
    this.load.image("platform", "./images/platform.png");

    // player is a sprite sheet made by 24x48 pixels
    this.load.spritesheet("player", "./images/spritesheet.png", {
      frameWidth: 130,
      frameHeight: 130,
    });

    // the coin is a sprite sheet made by 20x20 pixels
    this.load.spritesheet("coin", "./images/coin.png", {
      frameWidth: 20,
      frameHeight: 20,
    });

    // the firecamp is a sprite sheet made by 32x58 pixels
    this.load.spritesheet("fire", "./images/fire.png", {
      frameWidth: 40,
      frameHeight: 70,
    });

    // mountains are a sprite sheet made by 512x512 pixels
    this.load.spritesheet("mountain", "./images/mountain.png", {
      frameWidth: 512,
      frameHeight: 512,
    });
  }
  create() {
    //music
    this.music = this.sound.add("music");

    var musicConfig = {
      mute: false,
      volume: 1,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0,
    };
    this.music.play(musicConfig);
    // setting player animation
    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("player", {
        start: 0,
        end: 1,
      }),
      frameRate: 9,
      repeat: -1,
    });

    // setting coin animation
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

    // setting fire animation
    this.anims.create({
      key: "burn",
      frames: this.anims.generateFrameNumbers("fire", {
        start: 0,
        end: 4,
      }),
      frameRate: 15,
      repeat: -1,
    });

    // this.scene.start("PlayGame");
    this.scene.start("MenuScene");
  }
}

export default preloadGame;
