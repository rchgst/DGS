import Editor from '@monaco-editor/react';

interface CodeViewerProps {
  code: string;
}

/**
 * Monaco Editor panel that displays the generated C code in real-time.
 */
export default function CodeViewer({ code }: CodeViewerProps) {
  return (
    <div className="code-viewer-container" style={{ height: '100%', minHeight: '500px', border: '1px solid #e2e8f0' }}>
      <Editor
        height="100%"
        language="cpp" // Monaco uses 'cpp' for C/C++ syntax highlighting
        theme="vs-light"
        value={code}
        options={{
          readOnly: true,
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          domReadOnly: true
        }}
      />
    </div>
  );
}
