// import Phaser from "phaser";
import "jest-canvas-mock";
import preloadGame from "../preload";

// const loading = new preloadGame

// describe('Initializing a new game and retrieving a new game ID', () => {
//   test('Initializes and retrieves an Object', () => initializeGame().then(response => {
//     expect(typeof response).toBe('object');
//   }));
//   test('Retrieves an Object with a string containing a new ID', () => initializeGame().then(response => {
//     expect(typeof response.result).toBe('string');
//   }));
// });

test("preloadGame a subclass of container", () => {
  expect(preloadGame.prototype instanceof Phaser.GameObjects.Container).toBe(false);
});

test("preloadGame a subclass of container", () => {
  expect(preloadGame.prototype instanceof Phaser.Scene).toBe(true);
});
