import Phaser from 'phaser';
import gameOptions from './gameOptions';
import pause from './images/pause.png';
import BaseScene from './BaseScene';
import savingyou from './saveBestScore';

class playGame extends BaseScene {
  constructor(config) {
    super('PlayGame', config);
    this.score = 0;
    this.scoreText = '';
  }

  preload() {
    this.load.image('pause', pause);
  }

  create() {
    this.createScore();
    this.createPause();
    this.listenToEvents();
    this.mountainGroup = this.add.group();
    this.platformGroup = this.add.group({
      removeCallback(platform) {
        platform.scene.platformPool.add(platform);
      },
    });

    this.platformPool = this.add.group({
      removeCallback(platform) {
        platform.scene.platformGroup.add(platform);
      },
    });

    this.coinGroup = this.add.group({
      removeCallback(coin) {
        coin.scene.coinPool.add(coin);
      },
    });

    this.coinPool = this.add.group({
      removeCallback(coin) {
        coin.scene.coinGroup.add(coin);
      },
    });

    this.fireGroup = this.add.group({
      removeCallback(fire) {
        fire.scene.firePool.add(fire);
      },
    });

    this.firePool = this.add.group({
      removeCallback(fire) {
        fire.scene.fireGroup.add(fire);
      },
    });

    this.addMountains();
    this.addedPlatforms = 0;
    this.playerJumps = 0;
    this.addPlatform(
      this.cameras.main.width,
      this.cameras.main.width / 2,
      this.cameras.main.height * gameOptions.platformVerticalLimit[1],
    );
    this.player = this.physics.add.sprite(gameOptions.playerStartPosition, this.cameras.main.height * 0.5, 'player');
    this.player.setGravityY(gameOptions.playerGravity);
    this.player.setDepth(2);
    this.dying = false;
    this.platformCollider = this.physics.add.collider(
      this.player,
      this.platformGroup,
      function () {
        if (!this.player.anims.isPlaying) {
          this.player.anims.play('run');
        }
      },
      null,
      this,
    );

    this.physics.add.overlap(
      this.player,
      this.coinGroup,
      function (player, coin) {
        this.tweens.add({
          targets: coin,
          y: coin.y - 100,
          alpha: 0,
          duration: 800,
          ease: 'Cubic.easeOut',
          callbackScope: this,
          onComplete() {
            this.increaseScore();
            this.saveBestScore();
            this.coinGroup.killAndHide(coin);
            this.coinGroup.remove(coin);
          },
        });
      },
      null,
      this,
    );

    this.physics.add.overlap(
      this.player,
      this.fireGroup,
      function () {
        this.dying = true;
        this.player.anims.stop();
        this.player.setFrame(2);
        this.player.body.setVelocityY(-200);
        this.physics.world.removeCollider(this.platformCollider);
        this.player.setTint(0xee4824);
      },
      null,
      this,
    );

    this.input.on('pointerdown', this.jump, this);
    this.input.keyboard.on('keydown-SPACE', this.jump, this);
  }

  addMountains() {
    const rightmostMountain = this.getRightmostMountain();
    if (rightmostMountain < this.cameras.main.width * 2) {
      const mountain = this.physics.add.sprite(rightmostMountain + Phaser.Math.Between(100, 350), this.cameras.main.height + Phaser.Math.Between(0, 100), 'mountain');
      mountain.setOrigin(0.5, 1);
      mountain.body.setVelocityX(gameOptions.mountainSpeed * -1);
      this.mountainGroup.add(mountain);
      if (Phaser.Math.Between(0, 1)) {
        mountain.setDepth(1);
      }
      mountain.setFrame(Phaser.Math.Between(0, 3));
      this.addMountains();
    }
  }

  getRightmostMountain() {
    let rightmostMountain = -200;
    this.mountainGroup.getChildren().forEach((mountain) => {
      rightmostMountain = Math.max(rightmostMountain, mountain.x);
    });
    return rightmostMountain;
  }

  addPlatform(platformWidth, posX, posY) {
    this.addedPlatforms += 1;
    let platform;
    if (this.platformPool.getLength()) {
      platform = this.platformPool.getFirst();
      platform.x = posX;
      platform.y = posY;
      platform.active = true;
      platform.visible = true;
      this.platformPool.remove(platform);
      const newRatio = platformWidth / platform.displayWidth;
      platform.displayWidth = platformWidth;
      platform.tileScaleX = 1 / platform.scaleX;
    } else {
      platform = this.add.tileSprite(posX, posY, platformWidth, 32, 'platform');
      this.physics.add.existing(platform);
      platform.body.setImmovable(true);
      platform.body
        .setVelocityX(
          Phaser
            .Math
            .Between(
              gameOptions.platformSpeedRange[0],
              gameOptions.platformSpeedRange[1],
            ) * -1,
        );
      platform.setDepth(2);
      this.platformGroup.add(platform);
    }
    this.nextPlatformDistance = Phaser
      .Math
      .Between(
        gameOptions.spawnRange[0],
        gameOptions.spawnRange[1],
      );
    if (this.addedPlatforms > 1) {
      if (Phaser.Math.Between(1, 100) <= gameOptions.coinPercent) {
        if (this.coinPool.getLength()) {
          const coin = this.coinPool.getFirst();
          coin.x = posX;
          coin.y = posY - 96;
          coin.alpha = 1;
          coin.active = true;
          coin.visible = true;
          this.coinPool.remove(coin);
        } else {
          const coin = this.physics.add.sprite(posX, posY - 96, 'coin');
          coin.setImmovable(true);
          coin.setVelocityX(platform.body.velocity.x);
          coin.anims.play('rotate');
          coin.setDepth(2);
          this.coinGroup.add(coin);
        }
      }

      if (Phaser.Math.Between(1, 100) <= gameOptions.firePercent) {
        if (this.firePool.getLength()) {
          const fire = this.firePool.getFirst();
          fire.x = posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth);
          fire.y = posY - 46;
          fire.alpha = 1;
          fire.active = true;
          fire.visible = true;
          this.firePool.remove(fire);
        } else {
          const fire = this.physics.add.sprite(posX - platformWidth / 2 + Phaser.Math.Between(1, platformWidth), posY - 46, 'fire');
          fire.setImmovable(true);
          fire.setVelocityX(platform.body.velocity.x);
          fire.setSize(8, 2, true);
          fire.anims.play('burn');
          fire.setDepth(2);
          this.fireGroup.add(fire);
        }
      }
    }
  }

  jump() {
    if (
      !this.dying && (
        this.player.body.touching.down
        || (
          this.playerJumps > 0
          && this.playerJumps < gameOptions.jumps
        ))) {
      if (this.player.body.touching.down) {
        this.playerJumps = 0;
      }
      this.player.setVelocityY(gameOptions.jumpForce * -1);
      this.playerJumps += 1;

      // stops animation
      this.player.anims.stop();
    }
  }

  saveBestScore() {
    savingyou(this.score);
  }

  update() {
    if (this.player.y > this.cameras.main.height) {
      this.scene.start('PlayGame');
      this.saveBestScore();
    }

    this.player.x = gameOptions.playerStartPosition;
    let minDistance = this.cameras.main.width;
    let rightmostPlatformHeight = 0;
    this.platformGroup.getChildren().forEach(function (platform) {
      const platformDistance = this.cameras.main.width - platform.x - platform.displayWidth / 2;
      if (platformDistance < minDistance) {
        minDistance = platformDistance;
        rightmostPlatformHeight = platform.y;
      }
      if (platform.x < -platform.displayWidth / 2) {
        this.platformGroup.killAndHide(platform);
        this.platformGroup.remove(platform);
      }
    }, this);

    this.coinGroup.getChildren().forEach(function (coin) {
      if (coin.x < -coin.displayWidth / 2) {
        this.coinGroup.killAndHide(coin);
        this.coinGroup.remove(coin);
      }
    }, this);

    this.fireGroup.getChildren().forEach(function (fire) {
      if (fire.x < -fire.displayWidth / 2) {
        this.fireGroup.killAndHide(fire);
        this.fireGroup.remove(fire);
      }
    }, this);

    this.mountainGroup.getChildren().forEach(function (mountain) {
      if (mountain.x < -mountain.displayWidth) {
        const rightmostMountain = this.getRightmostMountain();
        mountain.x = rightmostMountain + Phaser.Math.Between(100, 350);
        mountain.y = this.cameras.main.height + Phaser.Math.Between(0, 100);
        mountain.setFrame(Phaser.Math.Between(0, 3));
        if (Phaser.Math.Between(0, 1)) {
          mountain.setDepth(1);
        }
      }
    }, this);

    if (minDistance > this.nextPlatformDistance) {
      const nextPlatformWidth = Phaser
        .Math
        .Between(
          gameOptions.platformSizeRange[0],
          gameOptions.platformSizeRange[1],
        );
      const platformRandomHeight = gameOptions.platformHeighScale * Phaser
        .Math
        .Between(
          gameOptions.platformHeightRange[0],
          gameOptions.platformHeightRange[1],
        );
      const nextPlatformGap = rightmostPlatformHeight + platformRandomHeight;
      const minPlatformHeight = this.cameras.main.height * gameOptions.platformVerticalLimit[0];
      const maxPlatformHeight = this.cameras.main.height * gameOptions.platformVerticalLimit[1];
      const nextPlatformHeight = Phaser
        .Math
        .Clamp(
          nextPlatformGap,
          minPlatformHeight,
          maxPlatformHeight,
        );
      this.addPlatform(
        nextPlatformWidth,
        this.cameras.main.width + nextPlatformWidth / 2,
        nextPlatformHeight,
      );
    }
  }

  createScore() {
    this.score = 0;
    const bestScore = localStorage.getItem('bestScore');
    this.scoreText = this.add.text(16, 16, `Score: ${0}`, { fontSize: '32px', fill: '#000' });
    this.add.text(16, 52, `Best score: ${bestScore || 0}`, { fontSize: '18px', fill: '#000' });
  }

  createPause() {
    const pauseButton = this.add.image(46, 76, 'pause').setInteractive().setScale(3).setOrigin(0);
    pauseButton.on('pointerdown', () => {
      this.physics.pause();
      this.scene.pause();
      this.scene.launch('PauseScene');
    });
  }

  increaseScore() {
    this.score += 1;
    this.scoreText.setText(`Score: ${this.score}`);
  }

  listenToEvents() {
    if (this.pauseEvent) {
      return;
    }
    this.pauseEvent = this.events.on('resume', () => {
      this.initialTime = 3;
      this.countDownText = this.add.text(...this.resumeScreenCenter, `Starting in: ${this.initialTime}`, this.fontResume).setOrigin(0);
      this.timedEvent = this.time.addEvent({
        delay: 1000,
        callback: this.countDown,
        callbackScope: this,
        loop: true,
      });
    });
  }

  countDown() {
    this.initialTime -= 1;
    this.countDownText.setText(`Starting in: ${this.initialTime}`);
    if (this.initialTime <= 0) {
      this.countDownText.setText('');
      this.physics.resume();
      this.timedEvent.remove();
    }
  }
}

export default playGame;
