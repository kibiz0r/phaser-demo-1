import Canvas from "canvas";
import JSDOMEnvironment from "jest-environment-jsdom";

console.log("req");

export default class PhaserEnvironment extends JSDOMEnvironment {
  constructor(config, options) {
    super(config, options);
    (this.global as any).Image = Canvas.Image;
    this.global.window.focus = () => { }
  }

  async setup() {
    console.log("hi");
  }
}
