import { useState, useRef, useCallback } from 'react';
import { CodeRunner, RunnerOptions } from '../core/interpreter/runner';

/**
 * Custom hook to control code execution, runtime state, and console outputs.
 */
export function useRunner() {
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [inputRequired, setInputRequired] = useState(false);
  const [promptText, setPromptText] = useState('');
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);
  
  const runnerRef = useRef<CodeRunner | null>(null);
  const inputCallbackRef = useRef<((value: string) => void) | null>(null);

  const clearConsole = useCallback(() => {
    setLogs([]);
  }, []);

  const stop = useCallback(() => {
    if (runnerRef.current) {
      runnerRef.current.stop();
      runnerRef.current = null;
    }
    setIsRunning(false);
    setInputRequired(false);
    setActiveBlockId(null);
  }, []);

  const run = useCallback((jsCode: string) => {
    stop();
    setLogs(['[Inicio de ejecución...]']);
    setActiveBlockId(null);

    const options: RunnerOptions = {
      onOutput: (text) => {
        setLogs((prev) => [...prev, text]);
      },
      onInput: (text, callback) => {
        setPromptText(text);
        setInputRequired(true);
        inputCallbackRef.current = callback;
      },
      onHighlightBlock: (blockId) => {
        setActiveBlockId(blockId);
      },
      onFinished: () => {
        setLogs((prev) => [...prev, '[Ejecución finalizada con éxito]']);
        setIsRunning(false);
        setActiveBlockId(null);
      },
      onError: (err) => {
        setLogs((prev) => [...prev, `[Error de ejecución]: ${err}`]);
        setIsRunning(false);
        setActiveBlockId(null);
      }
    };

    const runner = new CodeRunner(jsCode, options);
    runnerRef.current = runner;
    setIsRunning(true);
    runner.start();
  }, [stop]);

  const submitInput = useCallback((value: string) => {
    if (inputCallbackRef.current) {
      setLogs((prev) => [...prev, `> ${value}`]); // Echo input back to log
      setInputRequired(false);
      const callback = inputCallbackRef.current;
      inputCallbackRef.current = null;
      callback(value); // Resume interpreter execution
    }
  }, []);

  return {
    isRunning,
    logs,
    inputRequired,
    promptText,
    activeBlockId,
    run,
    stop,
    submitInput,
    clearConsole
  };
}
