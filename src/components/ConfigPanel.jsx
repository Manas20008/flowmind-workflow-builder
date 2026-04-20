export default function ConfigPanel({ selectedNode, updateNode }) {
  if (!selectedNode) return <div style={panel}>Select a node</div>;

  const data = selectedNode.data;

  return (
    <div style={panel}>
      <h3>{data.type.toUpperCase()}</h3>

      <input
        placeholder="Title"
        onChange={(e) =>
          updateNode(selectedNode.id, { label: e.target.value })
        }
      />

      {data.type === "approval" && (
        <>
          <input
            placeholder="Role"
            onChange={(e) =>
              updateNode(selectedNode.id, { role: e.target.value })
            }
          />
          <input
            placeholder="Threshold"
            onChange={(e) =>
              updateNode(selectedNode.id, { threshold: e.target.value })
            }
          />
        </>
      )}
    </div>
  );
}

const panel = {
  width: 250,
  background: "#111827",
  color: "white",
  padding: 10,
};