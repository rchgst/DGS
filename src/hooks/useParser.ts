import { useState, useEffect } from 'react';
import { parseFlowToAST } from '../core/parser';
import { CLanguage } from '../core/translators/CLanguage';
import { JSLanguage } from '../core/translators/JSLanguage';

/**
 * Custom hook to compile the flow graph to C and JS code in real-time.
 * 
 * @param nodes Visual nodes in React Flow
 * @param edges Connections in React Flow
 */
export function useParser(nodes: any[], edges: any[]) {
  const [cCode, setCCode] = useState<string>('// Diseña un algoritmo para ver el código C generado...\n');
  const [jsCode, setJsCode] = useState<string>('');

  useEffect(() => {
    if (nodes.length === 0) {
      setCCode('// Diseña un algoritmo para ver el código C generado...\n');
      setJsCode('');
      return;
    }

    try {
      // 1. Convert flowchart elements into Abstract Syntax Tree (AST)
      const ast = parseFlowToAST(nodes, edges);

      // 2. Generate C code for demonstration
      const cTranslator = new CLanguage();
      const cResult = cTranslator.translate(ast);
      setCCode(cResult);

      // 3. Generate JS code for running in the sandbox
      const jsTranslator = new JSLanguage();
      const jsResult = jsTranslator.translate(ast);
      setJsCode(jsResult);
    } catch (err) {
      setCCode(`// Error de traducción: ${err instanceof Error ? err.message : String(err)}`);
    }
  }, [nodes, edges]);

  return { cCode, jsCode };
}
