import Canvas from "canvas";
import JSDOMEnvironment from "jest-environment-jsdom";

module.exports = class PhaserEnvironment extends JSDOMEnvironment {
  constructor(config, options) {
    super(config, options);
    (this.global as any).Image = Canvas.Image;
    this.global.window.focus = () => { }
  }
}
