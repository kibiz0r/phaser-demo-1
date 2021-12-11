import type { Config } from '@jest/types';
import type { EnvironmentContext } from '@jest/environment';
import Canvas from "canvas";
import JSDOMEnvironment from "jest-environment-jsdom";

export default class PhaserEnvironment extends JSDOMEnvironment {
  constructor(config: Config.ProjectConfig, options?: EnvironmentContext) {
    super(config, options);
    (this.global as any).Image = Canvas.Image;
    this.global.window.focus = () => { }
  }
}
