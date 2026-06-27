export type BlockType = 'input' | 'output' | 'assignment' | 'alternative' | 'while' | 'for';

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
  // Can be a variable name (x) or string literal ("hola") or an expression
  expression: string; 
}

export interface AssignmentBlock extends BaseBlock {
  type: 'assignment';
  variableName: string;
  expression: string; // e.g. "5" or "c + 1"
}

export interface AlternativeBlock extends BaseBlock {
  type: 'alternative';
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
  startValue: string; // e.g. "1" or "a"
  endValue: string; // e.g. "10" or "b"
  step?: string; // e.g. "1" (optional)
  body: Block[];
}

export type Block = 
  | InputBlock 
  | OutputBlock 
  | AssignmentBlock 
  | AlternativeBlock 
  | WhileBlock 
  | ForBlock;

// Global state/context types
export interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN' | null;
  token: string | null;
}

export interface ExecutionState {
  isRunning: boolean;
  isPaused: boolean;
  currentBlockId: string | null;
  variables: Record<string, any>;
  outputLog: string[];
  inputRequired: boolean;
  inputCallback: ((value: any) => void) | null;
}
