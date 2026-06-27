/**
 * Sidebar toolbox containing the 6 fundamental blocks for drag-and-drop.
 */
export default function Toolbox() {
  const blocks = [
    { type: 'input', label: 'Input (Entrada)', desc: 'Leer dato de variable' },
    { type: 'output', label: 'Output (Salida)', desc: 'Imprimir texto o valor' },
    { type: 'assignment', label: 'Asignación', desc: 'Asignar valor (x = 5)' },
    { type: 'if-else', label: 'If-Else (Alternativa)', desc: 'Bifurcar según condición' },
    { type: 'while', label: 'While (Mientras)', desc: 'Repetir mientras cumpla' },
    { type: 'for', label: 'For (Para)', desc: 'Repetir rango fijo' }
  ];

  const onDragStart = (event: React.DragEvent, blockType: string) => {
    event.dataTransfer.setData('application/reactflow', blockType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="toolbox" style={{ padding: '16px', background: '#f7fafc', borderRight: '1px solid #e2e8f0' }}>
      <h3 style={{ marginTop: 0, color: '#2d3748' }}>Bloques</h3>
      <p style={{ fontSize: '12px', color: '#718096' }}>Arrastra un bloque al lienzo para diseñar tu algoritmo:</p>
      
      <div className="blocks-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {blocks.map((block) => (
          <div
            key={block.type}
            className={`toolbox-block block-${block.type}`}
            draggable
            onDragStart={(e) => onDragStart(e, block.type)}
            style={{
              padding: '12px',
              background: '#fff',
              border: '1px solid #cbd5e0',
              borderRadius: '6px',
              cursor: 'grab',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}
          >
            <strong>{block.label}</strong>
            <div style={{ fontSize: '11px', color: '#a0aec0' }}>{block.desc}</div>
          </div>
        ))}
      </div>
    </aside>
  );
}
