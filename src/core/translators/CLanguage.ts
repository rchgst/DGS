import { Block } from '../types';
import { ILanguage } from './ILanguage';

export class CLanguage implements ILanguage {
  
  /**
   * Main entry point to translate AST to C.
   */
  translate(blocks: Block[]): string {
    const variables = this.collectVariables(blocks);
    const bodyCode = this.translateBlocks(blocks, 1);
    
    // Build C code template
    let code = "#include <stdio.h>\n\n";
    code += "int main() {\n";
    
    // Declare all variables
    if (variables.size > 0) {
      code += "    // Declaración de variables\n";
      code += `    double ${Array.from(variables).join(', ')};\n\n`;
    }
    
    code += bodyCode;
    code += "    return 0;\n";
    code += "}\n";
    
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
   * Translates block arrays recursively with indentation.
   */
  private translateBlocks(blocks: Block[], indentLevel: number): string {
    let result = "";
    const indent = "    ".repeat(indentLevel);
    
    for (const block of blocks) {
      switch (block.type) {
        case 'input':
          result += `${indent}// Entrada de dato\n`;
          result += `${indent}printf("Ingrese ${block.variableName}: ");\n`;
          result += `${indent}scanf("%lf", &${block.variableName});\n`;
          break;
          
        case 'output':
          result += `${indent}printf("%g\\n", ${block.expression});\n`;
          break;
          
        case 'assignment':
          result += `${indent}${block.variableName} = ${block.expression};\n`;
          break;
          
        case 'if-else':
          result += `${indent}if (${block.condition}) {\n`;
          result += this.translateBlocks(block.trueBranch, indentLevel + 1);
          result += `${indent}} else {\n`;
          result += this.translateBlocks(block.falseBranch, indentLevel + 1);
          result += `${indent}}\n`;
          break;
          
        case 'while':
          result += `${indent}while (${block.condition}) {\n`;
          result += this.translateBlocks(block.body, indentLevel + 1);
          result += `${indent}}\n`;
          break;
          
        case 'for':
          result += `${indent}for (${block.variableName} = ${block.startValue}; ${block.variableName} <= ${block.endValue}; ${block.variableName}++) {\n`;
          result += this.translateBlocks(block.body, indentLevel + 1);
          result += `${indent}}\n`;
          break;
      }
    }
    
    return result;
  }
}
