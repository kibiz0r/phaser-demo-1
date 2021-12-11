import Phaser from "phaser";
import Scene from "./scene";

const scene = new Scene({});

const config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 800,
  physics: {
    default: 'arcade',
    arcade: {}
  },
  scene: scene
};

const game = new Phaser.Game(config);

if (module['hot']) {
  module['hot'].dispose(() => {
    game.destroy(true);
  });
}
