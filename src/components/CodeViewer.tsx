// import Editor from '@monaco-editor/react';

interface CodeViewerProps {
    code: string;
}

export default function CodeViewer({ code }: CodeViewerProps) {
    return <div>{code}</div>;
}
