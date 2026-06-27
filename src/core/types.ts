export type BlockType = 'input' | 'output' | 'assignment' | 'if-else' | 'while' | 'for';

export interface BaseBlock {
  id: string;
  type: BlockType;
}

export interface InputBlock extends BaseBlock {
  type: 'input';
  variableName: string;
}

export interface OutputBlock extends BaseBlock {
  type: 'output';
  expression: string; // e.g. "x" or "\"hola\""
}

export interface AssignmentBlock extends BaseBlock {
  type: 'assignment';
  variableName: string;
  expression: string; // e.g. "5" or "c + 1"
}

export interface IfElseBlock extends BaseBlock {
  type: 'if-else';
  condition: string; // e.g. "x > 4"
  trueBranch: Block[];
  falseBranch: Block[];
}

export interface WhileBlock extends BaseBlock {
  type: 'while';
  condition: string; // e.g. "x < 10"
  body: Block[];
}

export interface ForBlock extends BaseBlock {
  type: 'for';
  variableName: string; // e.g. "i"
  startValue: string; // e.g. "a" or "1"
  endValue: string; // e.g. "b" or "10"
  body: Block[];
}

export type Block = 
  | InputBlock 
  | OutputBlock 
  | AssignmentBlock 
  | IfElseBlock 
  | WhileBlock 
  | ForBlock;

export interface Program {
  blocks: Block[];
}
