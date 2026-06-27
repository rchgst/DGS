import { useState, useRef, useEffect } from 'react';

interface ConsoleProps {
  logs: string[];
  inputRequired: boolean;
  promptText: string;
  onSubmitInput: (value: string) => void;
  onClear: () => void;
}

/**
 * Simulated console terminal for input/output testing in the browser.
 */
export default function Console({ logs, inputRequired, promptText, onSubmitInput, onClear }: ConsoleProps) {
  const [inputValue, setInputValue] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new logs
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;
    onSubmitInput(inputValue);
    setInputValue('');
  };

  return (
    <div className="console" style={{ background: '#1a202c', color: '#f7fafc', padding: '16px', borderRadius: '6px', fontFamily: 'monospace', height: '250px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #4a5568', paddingBottom: '6px', marginBottom: '8px' }}>
        <span style={{ fontWeight: 'bold', color: '#a0aec0' }}>CONSOLA</span>
        <button 
          onClick={onClear}
          style={{ background: 'transparent', border: 'none', color: '#e53e3e', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Limpiar
        </button>
      </div>

      {/* Logs output */}
      <div className="console-logs" style={{ flex: 1, overflowY: 'auto', marginBottom: '8px', fontSize: '14px', lineHeight: '1.5' }}>
        {logs.length === 0 ? (
          <div style={{ color: '#718096', fontStyle: 'italic' }}>Consola inactiva. Presiona 'Ejecutar' para iniciar.</div>
        ) : (
          logs.map((log, index) => (
            <div key={index} style={{ whiteSpace: 'pre-wrap' }}>
              {log}
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input prompt */}
      {inputRequired && (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', borderTop: '1px solid #4a5568', paddingTop: '8px' }}>
          <span style={{ color: '#ecc94b', alignSelf: 'center' }}>{promptText || 'Entrada:'}</span>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              background: '#2d3748',
              border: '1px solid #4a5568',
              color: '#fff',
              padding: '6px 10px',
              borderRadius: '4px',
              fontFamily: 'monospace'
            }}
          />
          <button
            type="submit"
            style={{
              background: '#4299e1',
              color: '#fff',
              border: 'none',
              padding: '6px 12px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Enviar
          </button>
        </form>
      )}
    </div>
  );
}
