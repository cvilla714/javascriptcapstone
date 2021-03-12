import "jest-canvas-mock";
import BaseScene from "../BaseScene";

test("PauseScene is a subclass of container", () => {
  expect(BaseScene.prototype instanceof BaseScene).toBe(false);
});

test("PauseScene is not a subclass of container", () => {
  expect(BaseScene.prototype instanceof Phaser.GameObjects.Container).not.toBe(true);
});
