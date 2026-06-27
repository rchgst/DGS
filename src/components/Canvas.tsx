import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

/**
 * Interactive visual canvas where students drag and connect flowchart blocks.
 */
export default function Canvas() {
  return (
    <div className="canvas-container" style={{ width: '100%', height: '100%', minHeight: '500px' }}>
      <ReactFlow
        nodes={[]}
        edges={[]}
        fitView
      >
        <Background color="#cbd5e0" gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
