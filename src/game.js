import Phaser from 'phaser';
import preloadGame from './preload';
import playGame from './playgame';
import MenuScene from './MenuScene';
import ScoreScene from './ScoreScene';
import PauseScene from './PauseScene';

let game;

const resize = () => {
  const canvas = document.querySelector('canvas');
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const windowRatio = windowWidth / windowHeight;
  const gameRatio = game.config.width / game.config.height;
  if (windowRatio < gameRatio) {
    canvas.style.width = `${windowWidth}px`;
    canvas.style.height = `${windowWidth / gameRatio}px`;
  } else {
    canvas.style.width = `${windowHeight * gameRatio}px`;
    canvas.style.height = `${windowHeight}px`;
  }
};


window.onload = function () {
  const gameConfig = {
    type: Phaser.AUTO,
    width: 1334,
    height: 750,
    scene: [preloadGame, MenuScene, ScoreScene, playGame, PauseScene],
    backgroundColor: 0x0c88c7,
    physics: {
      default: 'arcade',
    },
  };
  game = new Phaser.Game(gameConfig);
  window.focus();
  resize();
  window.addEventListener('resize', resize, false);
};
