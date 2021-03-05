import main from "./images/main.png";
// import main2 from "./images/main2.png";
import player from "./images/player.png";
import platform from "./images/platform.png";
import coin from "./images/coin.png";
import fire from "./images/fire.png";
import mountain from "./images/mountain.png";
import music from "./DanceandJump.ogg";

class preloadGame extends Phaser.Scene {
  constructor() {
    super("PreloadGame");
  }
  preload() {
    this.load.audio("music", music);
    this.load.image("platform", platform);

    // player is a sprite sheet made by 24x48 pixels
    this.load.spritesheet("player", main, {
      frameWidth: 104,
      frameHeight: 118,
    });

    // the coin is a sprite sheet made by 20x20 pixels
    this.load.spritesheet("coin", coin, {
      frameWidth: 20,
      frameHeight: 20,
    });

    // the firecamp is a sprite sheet made by 32x58 pixels
    this.load.spritesheet("fire", fire, {
      frameWidth: 40,
      frameHeight: 70,
    });

    // mountains are a sprite sheet made by 512x512 pixels
    this.load.spritesheet("mountain", mountain, {
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
      frameRate: 8,
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

    this.scene.start("PlayGame");
  }
}

export default preloadGame;
