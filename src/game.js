import Phaser from 'phaser';
import preloadGame from './preload';
import playGame from './playgame';
import resize from './resize';
import MenuScene from './MenuScene';
import ScoreScene from './ScoreScene';
import PauseScene from './PauseScene';

let game;

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

export { game };
