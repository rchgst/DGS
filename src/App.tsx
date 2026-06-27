import Canvas from './components/Canvas';
import CodeViewer from './components/CodeViewer';
import Console from './components/Console';
import Toolbox from './components/Toolbox';

export default function App() {
    return (
        <div>
            <h1>DGS</h1>
            <Toolbox />
            <Canvas />
            <Console />
            <CodeViewer code=""/>
        </div>
    );
}