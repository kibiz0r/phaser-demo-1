import Phaser from "phaser";

describe("fo", () => {
  it("do", () => {
    const game = new Phaser.Game({
      type: Phaser.HEADLESS,
      width: 1200,
      height: 800,
      physics: {
        default: 'arcade',
        arcade: {}
      },
      scene: {
        preload() {
          console.log("preload");
        },

        create() {
          console.log("create");
        }
      }
    });
    const scene = game.scene.getAt(0);
    const zone = scene.physics.add.existing(scene.add.zone(0, 0, 10, 10));
    zone.body.setVelocity(25, 25);
    // game.step(0, 1000);
    game.headlessStep(0, 1000);
    expect(zone.x).toBe(25);
  });
  // it("do", () => {
  //   const game = new Phaser.Game({
  //     type: Phaser.HEADLESS,
  //     width: 1200,
  //     height: 800,
  //     physics: {
  //       default: 'arcade',
  //       arcade: {}
  //     },
  //     scene: {
  //       preload() {
  //         console.log("preload");
  //       },

  //       create() {
  //         console.log("create");
  //       }
  //     }
  //   });
  //   const scene = game.scene.getAt(0);
  //   const zone = scene.physics.add.existing(scene.add.zone(0, 0, 10, 10));
  //   zone.body.setVelocity(25, 25);
  //   // game.step(0, 1000);
  //   game.headlessStep(0, 1000);
  //   expect(zone.x).toBe(25);
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  //   console.log("hi");
  // });
});
