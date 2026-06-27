import type { Block } from '../types';
import type { ILanguage } from './ILanguage';

export class CLanguage implements ILanguage {
  translate(_blocks: Block[]): string {
    return "";
  }
}