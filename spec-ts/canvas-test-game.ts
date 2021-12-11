import Phaser from "phaser";

export default class CanvasTestGame extends Phaser.Game {
  advance(delta: number) {
    this.step(0, delta);
  }
}
