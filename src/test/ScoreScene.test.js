import 'jest-canvas-mock';
import Phaser from 'phaser';
import BaseScene from '../BaseScene';

test('ScoreScene is a subclass of container', () => {
  expect(BaseScene.prototype instanceof BaseScene).toBe(false);
});

test('ScoreScene is not a subclass of container', () => {
  expect(BaseScene.prototype instanceof Phaser.GameObjects.Container).not.toBe(true);
});
