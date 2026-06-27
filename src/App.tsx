import { useState } from 'react';
import Toolbox from './components/Toolbox';
import Canvas from './components/Canvas';
import CodeViewer from './components/CodeViewer';
import Console from './components/Console';
import { useParser } from './hooks/useParser';
import { useRunner } from './hooks/useRunner';
import { compressToURL } from './utils/share';

export default function App() {
  // Visual nodes and edges state from React Flow
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<any[]>([]);

  // Parser compiler hooks
  const { cCode, jsCode } = useParser(nodes, edges);

  // Runtime runner hooks
  const {
    isRunning,
    logs,
    inputRequired,
    promptText,
    run,
    stop,
    submitInput,
    clearConsole
  } = useRunner();

  // Share diagram URL generator
  const handleShare = () => {
    const data = { nodes, edges };
    const hash = compressToURL(data);
    const shareURL = `${window.location.origin}${window.location.pathname}#share=${hash}`;
    
    // Copy URL to clipboard
    navigator.clipboard.writeText(shareURL)
      .then(() => alert('¡Enlace de compartir copiado al portapapeles!'))
      .catch(() => alert('Error al copiar el enlace'));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* Header Navigation */}
      <header style={{
        background: '#1a365d',
        color: '#fff',
        padding: '12px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', tracking: 'wide' }}>DGS</h1>
          <span style={{ fontSize: '11px', color: '#90cdf4' }}>Aprende lógica de programación visualmente</span>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => run(jsCode)}
            disabled={isRunning || nodes.length === 0}
            style={{
              background: isRunning ? '#a0aec0' : '#48bb78',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: isRunning || nodes.length === 0 ? 'not-allowed' : 'pointer',
              fontWeight: 'bold'
            }}
          >
            Ejecutar
          </button>
          
          <button
            onClick={stop}
            disabled={!isRunning}
            style={{
              background: '#e53e3e',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: !isRunning ? 'not-allowed' : 'pointer',
              fontWeight: 'bold'
            }}
          >
            Detener
          </button>

          <button
            onClick={handleShare}
            style={{
              background: '#3182ce',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Compartir
          </button>
        </div>
      </header>

      {/* Main Workspace Workspace */}
      <main style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        
        {/* Left Side: Toolbox & Canvas */}
        <section style={{ flex: 3, display: 'flex', height: '100%' }}>
          <Toolbox />
          <div style={{ flex: 1, height: '100%', position: 'relative' }}>
            <Canvas />
          </div>
        </section>

        {/* Right Side: Monaco Code CodeViewer & Console Terminal */}
        <section style={{ flex: 2, display: 'flex', flexDirection: 'column', height: '100%', borderLeft: '2px solid #cbd5e0' }}>
          <div style={{ flex: 3, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '8px 16px', background: '#edf2f7', borderBottom: '1px solid #cbd5e0', fontWeight: 'bold', fontSize: '13px', color: '#4a5568' }}>
              Código C Equivalente (Generado en tiempo real)
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <CodeViewer code={cCode} />
            </div>
          </div>
          <div style={{ flex: 2, borderTop: '2px solid #cbd5e0' }}>
            <Console
              logs={logs}
              inputRequired={inputRequired}
              promptText={promptText}
              onSubmitInput={submitInput}
              onClear={clearConsole}
            />
          </div>
        </section>

      </main>

    </div>
  );
}
