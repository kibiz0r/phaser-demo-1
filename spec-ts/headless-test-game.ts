import Phaser from "phaser";

export default class HeadlessTestGame extends Phaser.Game {
  advance(delta: number) {
    this.headlessStep(0, delta);
  }
}
