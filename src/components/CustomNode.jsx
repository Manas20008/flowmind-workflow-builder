import { Handle, Position } from "reactflow";

export default function CustomNode({ data }) {
  const colors = {
    start: "#10b981",
    task: "#3b82f6",
    approval: "#f59e0b",
    automated: "#8b5cf6",
    end: "#ef4444",
  };

  return (
    <div
      style={{
        padding: 10,
        borderRadius: 6,
        color: "white",
        background: colors[data.type] || "#374151",
        textAlign: "center",
        minWidth: 100,
      }}
    >
      <Handle type="target" position={Position.Left} />
      {data.label}
      <Handle type="source" position={Position.Right} />
    </div>
  );
}