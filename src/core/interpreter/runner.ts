// @ts-ignore - js-interpreter does not have official TS typings out of the box
import Interpreter from 'js-interpreter';

export interface RunnerOptions {
  onOutput: (text: string) => void;
  onInput: (promptText: string, callback: (value: string) => void) => void;
  onHighlightBlock: (blockId: string) => void;
  onFinished: () => void;
  onError: (error: string) => void;
}

export class CodeRunner {
  private interpreter: any = null;
  private isRunning = false;
  private timerId: any = null;

  constructor(private jsCode: string, private options: RunnerOptions) {}

  /**
   * Initializes the JS interpreter with custom bridge APIs.
   */
  private initInterpreter(interpreter: any, globalObject: any) {
    // 1. Output bridge
    const outputWrapper = (text: string) => {
      this.options.onOutput(String(text));
    };
    interpreter.setProperty(globalObject, 'print', interpreter.createNativeFunction(outputWrapper));

    // 2. Input bridge (asynchronous)
    const inputWrapper = (promptText: string, callbackObj: any) => {
      this.options.onInput(String(promptText), (value) => {
        interpreter.runAsyncCallback(callbackObj, value);
        this.runStepByStep(); // Resume execution loop
      });
    };
    interpreter.setProperty(
      globalObject,
      'readInput',
      interpreter.createAsyncFunction(inputWrapper)
    );

    // 3. Block active tracking bridge
    const highlightWrapper = (blockId: string) => {
      this.options.onHighlightBlock(String(blockId));
    };
    interpreter.setProperty(
      globalObject,
      'highlightBlock',
      interpreter.createNativeFunction(highlightWrapper)
    );
  }

  /**
   * Starts the execution loop of the interpreter.
   */
  start() {
    try {
      this.interpreter = new Interpreter(
        this.jsCode,
        (interpreter: any, globalObject: any) => this.initInterpreter(interpreter, globalObject)
      );
      this.isRunning = true;
      this.runStepByStep();
    } catch (err) {
      this.options.onError(err instanceof Error ? err.message : String(err));
    }
  }

  /**
   * Stops/pauses execution.
   */
  stop() {
    this.isRunning = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  /**
   * Runs the interpreter step-by-step to allow async interrupts and UI response.
   */
  private runStepByStep() {
    if (!this.isRunning || !this.interpreter) return;

    try {
      // Run steps until it needs to pause (like waiting for async input) or completes
      let hasMore = true;
      while (hasMore && this.isRunning) {
        hasMore = this.interpreter.step();
        
        // If the interpreter has paused on an async action (e.g. readInput)
        if (this.interpreter.paused_) {
          return; // Exit loop, input wrapper will resume us once input resolves
        }
      }

      if (!hasMore) {
        this.isRunning = false;
        this.options.onFinished();
      }
    } catch (err) {
      this.isRunning = false;
      this.options.onError(err instanceof Error ? err.message : String(err));
    }
  }
}
