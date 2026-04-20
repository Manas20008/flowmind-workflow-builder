import { useState, useCallback } from "react";
import {
  ReactFlowProvider,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import FlowCanvas from "./components/FlowCanvas";
import Sidebar from "./components/Sidebar";
import ConfigPanel from "./components/ConfigPanel";
import SimulationPanel from "./components/SimulationPanel";
import { validateWorkflow } from "./utils/validation";

export default function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [logs, setLogs] = useState([]);
  const [score, setScore] = useState(0);

  // FIXED handlers (IMPORTANT)
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const addNode = (type) => {
    const id = Date.now().toString();
    setNodes((nds) => [
      ...nds,
      {
        id,
        type: "custom",
        position: { x: 200 + nds.length * 120, y: 200 },
        data: { label: type.toUpperCase(), type },
      },
    ]);
  };

  const updateNode = (id, data) => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, ...data } } : n
      )
    );
  };

  const runWorkflow = () => {
    const result = validateWorkflow(nodes, edges);
    setScore(result.score);

    if (result.errors.length) {
      setLogs(result.errors);
      return;
    }

    const start = nodes.find((n) => n.data.type === "start");
    if (!start) return;

    let visited = new Set();
    let current = start;
    let execution = [];

    while (current && !visited.has(current.id)) {
      visited.add(current.id);
      execution.push(`Executed: ${current.data.type.toUpperCase()}`);

      const nextEdge = edges.find((e) => e.source === current.id);
      current = nodes.find((n) => n.id === nextEdge?.target);
    }

    setLogs(execution);
  };

  return (
    <ReactFlowProvider>
      <div style={{ display: "flex", height: "100vh" }}>
        <Sidebar addNode={addNode} />

        <FlowCanvas
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          setEdges={setEdges}
          onNodeClick={setSelectedNode}
        />

        <ConfigPanel selectedNode={selectedNode} updateNode={updateNode} />

        <SimulationPanel runWorkflow={runWorkflow} logs={logs} score={score} />
      </div>
    </ReactFlowProvider>
  );
}