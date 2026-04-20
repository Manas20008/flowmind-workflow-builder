export default function Sidebar({ addNode }) {
  return (
    <div style={style}>
      <h3>Nodes</h3>
      {["start", "task", "approval", "automated", "end"].map((t) => (
        <button key={t} onClick={() => addNode(t)}>
          {t.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

const style = {
  width: 200,
  background: "#111827",
  color: "white",
  padding: 10,
  display: "flex",
  flexDirection: "column",
  gap: 10,
};