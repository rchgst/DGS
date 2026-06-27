import type { Block } from '../types';
import type { ILanguage } from './ILanguage';

export class JSLanguage implements ILanguage {
  translate(_blocks: Block[]): string {
    return "";
  }
}