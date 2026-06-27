import { Block } from '../types';
import { ILanguage } from './ILanguage';

export class JSLanguage implements ILanguage {
  
  /**
   * Main entry point to translate AST to JS.
   */
  translate(blocks: Block[]): string {
    const variables = this.collectVariables(blocks);
    let code = "";
    
    // Declare all variables in JS
    if (variables.size > 0) {
      code += `var ${Array.from(variables).join(', ')};\n\n`;
    }
    
    code += this.translateBlocks(blocks);
    return code;
  }

  /**
   * Helper to collect all unique variables used in the program.
   */
  private collectVariables(blocks: Block[], vars = new Set<string>()): Set<string> {
    for (const block of blocks) {
      if (block.type === 'input') {
        vars.add(block.variableName);
      } else if (block.type === 'assignment') {
        vars.add(block.variableName);
      } else if (block.type === 'for') {
        vars.add(block.variableName);
        this.collectVariables(block.body, vars);
      } else if (block.type === 'if-else') {
        this.collectVariables(block.trueBranch, vars);
        this.collectVariables(block.falseBranch, vars);
      } else if (block.type === 'while') {
        this.collectVariables(block.body, vars);
      }
    }
    return vars;
  }

  /**
   * Translates block arrays recursively, injecting block highlight tracking.
   */
  private translateBlocks(blocks: Block[]): string {
    let result = "";
    
    for (const block of blocks) {
      // Inject highlight tracker for active step highlighting
      result += `highlightBlock("${block.id}");\n`;
      
      switch (block.type) {
        case 'input':
          // readInput is an async bridge function we register in js-interpreter
          result += `${block.variableName} = Number(readInput("Ingrese ${block.variableName}"));\n`;
          break;
          
        case 'output':
          // print is a bridge function we register in js-interpreter to log to console
          result += `print(${block.expression});\n`;
          break;
          
        case 'assignment':
          result += `${block.variableName} = ${block.expression};\n`;
          break;
          
        case 'if-else':
          result += `if (${block.condition}) {\n`;
          result += this.translateBlocks(block.trueBranch);
          result += `} else {\n`;
          result += this.translateBlocks(block.falseBranch);
          result += `}\n`;
          break;
          
        case 'while':
          result += `while (${block.condition}) {\n`;
          result += this.translateBlocks(block.body);
          result += `}\n`;
          break;
          
        case 'for':
          result += `for (${block.variableName} = ${block.startValue}; ${block.variableName} <= ${block.endValue}; ${block.variableName}++) {\n`;
          result += this.translateBlocks(block.body);
          result += `}\n`;
          break;
      }
    }
    
    return result;
  }
}
