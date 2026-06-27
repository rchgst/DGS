import type { Block } from '../types';

export interface ILanguage {
  translate(blocks: Block[]): string;
}