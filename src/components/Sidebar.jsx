export default function Sidebar() {
  const onDragStart = (e, type) => {
    e.dataTransfer.setData("type", type);
  };

  const nodes = ["task", "approval", "automated", "end"];

  return (
    <div style={{ width: 200, background: "#111827", color: "white", padding: 10 }}>
      <h3>Nodes</h3>
      {nodes.map(n => (
        <div
          key={n}
          draggable
          onDragStart={(e) => onDragStart(e, n)}
          style={{ padding: 8, margin: 10, background: "#374151", cursor: "grab" }}
        >
          {n.toUpperCase()}
        </div>
      ))}
    </div>
  );
}