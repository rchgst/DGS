import { Block, ExecutionState } from '../types';

/**
 * A simple safe expression evaluator for students' block diagrams.
 * In a real application, you should use a parser library (like mathjs or a custom AST parser) 
 * instead of direct eval for safety and better error reporting.
 */
export const evaluateExpression = (expression: string, variables: Record<string, any>): any => {
  try {
    // Basic sanitization
    const sanitized = expression.replace(/[^a-zA-Z0-9+\-*/%().\s<>!=&|]/g, '');
    
    // Create a function context with variables as parameters
    const keys = Object.keys(variables);
    const values = Object.values(variables);
    
    // Dynamically build and evaluate
    const fn = new Function(...keys, `return ${sanitized};`);
    return fn(...values);
  } catch (error) {
    throw new Error(`Error al evaluar la expresión "${expression}": ${error instanceof Error ? error.message : String(error)}`);
  }
};

/**
 * Execution Engine to run the block diagrams step-by-step.
 */
export class BlockInterpreter {
  private variables: Record<string, any> = {};
  private outputLog: string[] = [];

  constructor(initialVariables: Record<string, any> = {}) {
    this.variables = { ...initialVariables };
  }

  getVariables() {
    return this.variables;
  }

  getOutputLog() {
    return this.outputLog;
  }

  /**
   * Executes a single block.
   */
  async executeBlock(
    block: Block, 
    onInput: (variableName: string) => Promise<any>,
    onOutput: (text: string) => void
  ): Promise<void> {
    switch (block.type) {
      case 'input': {
        const val = await onInput(block.variableName);
        this.variables[block.variableName] = Number(val) || val;
        break;
      }

      case 'output': {
        const val = evaluateExpression(block.expression, this.variables);
        this.outputLog.push(String(val));
        onOutput(String(val));
        break;
      }

      case 'assignment': {
        const val = evaluateExpression(block.expression, this.variables);
        this.variables[block.variableName] = val;
        break;
      }

      case 'alternative': {
        const conditionResult = evaluateExpression(block.condition, this.variables);
        const branchToExecute = conditionResult ? block.trueBranch : block.falseBranch;
        
        for (const innerBlock of branchToExecute) {
          await this.executeBlock(innerBlock, onInput, onOutput);
        }
        break;
      }

      case 'while': {
        while (evaluateExpression(block.condition, this.variables)) {
          for (const innerBlock of block.body) {
            await this.executeBlock(innerBlock, onInput, onOutput);
          }
        }
        break;
      }

      case 'for': {
        const start = Number(evaluateExpression(block.startValue, this.variables));
        const end = Number(evaluateExpression(block.endValue, this.variables));
        const varName = block.variableName;

        for (let i = start; i <= end; i++) {
          this.variables[varName] = i;
          for (const innerBlock of block.body) {
            await this.executeBlock(innerBlock, onInput, onOutput);
          }
        }
        break;
      }

      default:
        throw new Error(`Tipo de bloque desconocido`);
    }
  }

  /**
   * Executes an array of blocks sequentially.
   */
  async executeProgram(
    blocks: Block[], 
    onInput: (variableName: string) => Promise<any>,
    onOutput: (text: string) => void
  ): Promise<void> {
    this.outputLog = [];
    for (const block of blocks) {
      await this.executeBlock(block, onInput, onOutput);
    }
  }
}
