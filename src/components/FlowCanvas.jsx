import { useCallback, useState, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState
} from "reactflow";

import "reactflow/dist/style.css";
import Sidebar from "./Sidebar";
import CustomNode from "./CustomNode";
import ConfigPanel from "./ConfigPanel";
import SimulationPanel from "./SimulationPanel";
import { validateWorkflow } from "../utils/validation";

let id = 1;
const getId = () => `${id++}`;

const nodeTypes = { custom: CustomNode };

export default function FlowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    { id: "0", type: "custom", position: { x: 250, y: 150 }, data: { label: "START", type: "start" } }
  ]);

  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [errors, setErrors] = useState([]);
  const [score, setScore] = useState(100);

  const onConnect = useCallback(params => setEdges(eds => addEdge(params, eds)), []);

  const onDrop = useCallback((event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData("type");

    const newNode = {
      id: getId(),
      type: "custom",
      position: { x: event.clientX - 250, y: event.clientY },
      data: { label: type.toUpperCase(), type }
    };

    setNodes(nds => [...nds, newNode]);
  }, []);

  const updateNode = (id, newData) => {
    setNodes(nds =>
      nds.map(n => n.id === id ? { ...n, data: { ...n.data, ...newData } } : n)
    );
  };

  useEffect(() => {
    const res = validateWorkflow(nodes, edges);
    setErrors(res.errors);
    setScore(res.score);
  }, [nodes, edges]);

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Sidebar />

      <div
        style={{ flex: 1, background: "#0f172a", position: "relative" }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={(_, n) => setSelectedNode(n)}
          onNodesDelete={(deleted) =>
            setEdges(eds => eds.filter(e => !deleted.some(n => n.id === e.source || n.id === e.target)))
          }
        >
          <Background />
          <Controls />
        </ReactFlow>

        <div style={{ position: "absolute", top: 10, right: 10, background: "#111827", color: "white", padding: 10 }}>
          Score: {score}
        </div>

        <div style={{ position: "absolute", bottom: 10, left: 10, background: "#7f1d1d", color: "white", padding: 10 }}>
          {errors.map((e, i) => <div key={i}>{e}</div>)}
        </div>

        <SimulationPanel nodes={nodes} edges={edges} />
      </div>

      <ConfigPanel selectedNode={selectedNode} updateNode={updateNode} />
    </div>
  );
}