import Phaser from "phaser";
import _ from "lodash";

type KeyBindings = {
  up: Phaser.Input.Keyboard.Key,
  down: Phaser.Input.Keyboard.Key,
  left: Phaser.Input.Keyboard.Key,
  right: Phaser.Input.Keyboard.Key,
};

export default class Scene extends Phaser.Scene {
  private keys: KeyBindings;
  private logo: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;

  constructor(a) {
    super(a);
  }

  preload() {
    console.log("preload");
    this.load.setBaseURL('http://labs.phaser.io');

    this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    this.load.image('red', 'assets/particles/red.png');
  }

  create() {
    console.log("create");
    this.add.image(400, 300, 'sky');

    const particles = this.add.particles('red');

    const emitter = particles.createEmitter({
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: Phaser.BlendModes.ADD
    });

    this.logo = this.physics.add.image(400, 100, 'logo');

    this.logo.setVelocity(100, 200);
    this.logo.setBounce(1, 1);
    this.logo.setCollideWorldBounds(true);
    // this.logo.setVelocity

    emitter.startFollow(this.logo);

    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    }) as any;
  }

  update(time: number, delta: number) {
    // 1. turn hardware inputs into player commands
    // 2. apply player commands to the simulation
    // 3. update the simulation
    console.log(time);

    // inputs
    const movement = new Phaser.Math.Vector2(0, 0);

    if (this.keys.left.getDuration()) {
      movement.x -= 200;
    } else if (this.keys.right.getDuration()) {
      movement.x += 200;
    }

    if (this.keys.up.getDuration()) {
      movement.y -= 100;
    } else if (this.keys.down.getDuration()) {
      movement.y += 100;
    }
  }
}