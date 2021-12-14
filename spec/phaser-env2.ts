import Canvas from "canvas";
import { JSDOM, VirtualConsole } from "jsdom";
import type { Context } from 'vm';
import type { EnvironmentContext } from '@jest/environment';
import { LegacyFakeTimers, ModernFakeTimers } from '@jest/fake-timers';
import type { Config, Global } from '@jest/types';
import { ModuleMocker } from 'jest-mock';
import { installCommonGlobals } from 'jest-util';

type Win = Window &
  Global.Global & {
    Error: {
      stackTraceLimit: number;
    };
  };

const dom = new JSDOM(`<!DOCTYPE html><body></body>`,
  {

    pretendToBeVisual: false,
    resources: undefined,
    runScripts: 'dangerously',
    // url: config.testURL,
    url: "http://localhost",
    virtualConsole: new VirtualConsole().sendTo(
      console,
    )
  });

const document = dom.window.document
const window = dom.window
window.focus = () => { }

global.document = document as any
global.window = window as any
global.window.Element = undefined as any
global.navigator = { userAgent: 'node' } as any
global.Image = Canvas.Image as any
// global.XMLHttpRequest = FakeXMLHttpRequest as any
global.HTMLCanvasElement = window.HTMLCanvasElement
global.HTMLVideoElement = window.HTMLVideoElement

// // @ts-ignore
// global.URL = () => { }
// global.URL.createObjectURL = (base64: any) => `data:image/png;base64,${base64}`
// global.URL.revokeObjectURL = () => { }

// // phaser on node variables
// global.phaserOnNodeFPS = 60

const animationFrame = (cb: any) => {
  if (typeof cb !== 'function') return 0 // this line saves a lot of cpu
  window.setTimeout(() => cb(0), 1000 / global.phaserOnNodeFPS)
  return 0
}
// export { animationFrame }

window.requestAnimationFrame = cb => {
  return animationFrame(cb)
}

// const requestAnimationFrame = window.requestAnimationFrame

(() => {
  require("phaser");
})();

export default class PhaserEnvironment {
  private dom: JSDOM | null;
  fakeTimers: LegacyFakeTimers<number> | null;
  fakeTimersModern: ModernFakeTimers | null;
  global: Win;
  private errorEventListener: ((event: Event & { error: Error }) => void) | null;
  moduleMocker: ModuleMocker | null;

  constructor(config: Config.ProjectConfig, options?: EnvironmentContext) {
    this.dom = dom;

    const global = (this.global = this.dom.window.document
      .defaultView as unknown as Win);

    if (!global) {
      throw new Error('JSDOM did not return a Window object');
    }

    // for "universal" code (code should use `globalThis`)
    global.global = global as any;

    // Node's error-message stack size is limited at 10, but it's pretty useful
    // to see more than that when a test fails.
    this.global.Error.stackTraceLimit = 100;
    try {
      installCommonGlobals(global as any, config.globals);
    } catch (error) { }

    // TODO: remove this ASAP, but it currently causes tests to run really slow
    global.Buffer = Buffer;

    // Report uncaught errors.
    this.errorEventListener = event => {
      if (userErrorListenerCount === 0 && event.error) {
        process.emit('uncaughtException', event.error);
      }
    };
    global.addEventListener('error', this.errorEventListener);

    // However, don't report them as uncaught if the user listens to 'error' event.
    // In that case, we assume the might have custom error handling logic.
    const originalAddListener = global.addEventListener;
    const originalRemoveListener = global.removeEventListener;
    let userErrorListenerCount = 0;
    global.addEventListener = function (
      ...args: Parameters<typeof originalAddListener>
    ) {
      if (args[0] === 'error') {
        userErrorListenerCount++;
      }
      return originalAddListener.apply(this, args);
    };
    global.removeEventListener = function (
      ...args: Parameters<typeof originalRemoveListener>
    ) {
      if (args[0] === 'error') {
        userErrorListenerCount--;
      }
      return originalRemoveListener.apply(this, args);
    };

    this.moduleMocker = new ModuleMocker(global as any);

    const timerConfig = {
      idToRef: (id: number) => id,
      refToId: (ref: number) => ref,
    };

    this.fakeTimers = new LegacyFakeTimers({
      config,
      global: global as unknown as typeof globalThis,
      moduleMocker: this.moduleMocker,
      timerConfig,
    });

    this.fakeTimersModern = new ModernFakeTimers({
      config,
      global: global as unknown as typeof globalThis,
    });

    (this.global as any).Image = Canvas.Image;
    this.global.window.focus = () => { }
    // require("phaser");
  }

  async setup() { }

  async teardown() {
  }

  getVmContext(): Context | null {
    if (this.dom) {
      return this.dom.getInternalVMContext();
    }
    return null;
  }
}
