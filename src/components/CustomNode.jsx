export default function CustomNode({ data }) {
  const colors = {
    start: "#10b981",
    task: "#3b82f6",
    approval: "#f59e0b",
    automated: "#8b5cf6",
    end: "#ef4444"
  };

  return (
    <div style={{
      padding: 12,
      borderRadius: 8,
      background: colors[data.type],
      color: "white",
      minWidth: 130,
      textAlign: "center",
      fontWeight: "bold"
    }}>
      {data.label}
    </div>
  );
}