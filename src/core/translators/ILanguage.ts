import { Block } from '../types';

/**
 * Base strategy interface for AST-to-code translators.
 */
export interface ILanguage {
  /**
   * Translates an array of AST blocks into code of the target language.
   * 
   * @param blocks The parsed AST blocks
   * @returns String representing the generated program code
   */
  translate(blocks: Block[]): string;
}
