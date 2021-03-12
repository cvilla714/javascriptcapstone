import "jest-canvas-mock";
import Phaser from "phaser";
import BaseScene from "../BaseScene";
import MenuScene from "../MenuScene";

test("MenuScene a subclass of container", () => {
  expect(MenuScene.prototype instanceof BaseScene).toBe(true);
});

test("MenuScene a subclass of container", () => {
  expect(MenuScene.prototype instanceof Phaser.Scene).not.toBe(false);
});
