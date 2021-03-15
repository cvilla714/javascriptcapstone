import 'jest-canvas-mock';
import Phaser from 'phaser';
import BaseScene from '../BaseScene';

test('BaseScene is a subclass of container', () => {
  expect(BaseScene.prototype instanceof Phaser.GameObjects.Container).toBe(false);
});

test('BaseScene is not a subclass of container', () => {
  expect(BaseScene.prototype instanceof Phaser.GameObjects.Container).not.toBe(true);
});
