import { useEffect, useState } from "react";
import { getAutomations } from "../services/api";

export default function ConfigPanel({ selectedNode, updateNode }) {
  const [form, setForm] = useState({});
  const [automations, setAutomations] = useState([]);

  useEffect(() => {
    if (selectedNode && selectedNode.data) {
      setForm(selectedNode.data);
    }
  }, [selectedNode]);

  useEffect(() => {
    getAutomations().then(setAutomations);
  }, []);

  if (!selectedNode || !selectedNode.data) {
    return <div style={panel}>No Node Selected</div>;
  }

  const handle = (key, value) => {
    const updated = { ...form, [key]: value };
    setForm(updated);
    updateNode(selectedNode.id, updated);
  };

  const selectedAction = automations.find(a => a.id === form.action);

  const inputStyle = {
    padding: "6px",
    background: "#1f2937",
    color: "white",
    border: "1px solid #374151",
    borderRadius: "4px"
  };

  return (
    <div style={panel}>
      <h3>{form.type?.toUpperCase()}</h3>

      <input
        style={inputStyle}
        value={form.label || ""}
        onChange={e => handle("label", e.target.value)}
        placeholder="Title"
      />

      {form.type === "start" && (
        <input
          style={inputStyle}
          placeholder="Metadata (key:value)"
          onChange={e => handle("meta", e.target.value)}
        />
      )}

      {form.type === "task" && (
        <>
          <input style={inputStyle} placeholder="Description" onChange={e => handle("description", e.target.value)} />
          <input style={inputStyle} placeholder="Assignee" onChange={e => handle("assignee", e.target.value)} />
          <input style={inputStyle} placeholder="Due Date" onChange={e => handle("dueDate", e.target.value)} />
        </>
      )}

      {form.type === "approval" && (
        <>
          <input style={inputStyle} placeholder="Role" onChange={e => handle("role", e.target.value)} />
          <input style={inputStyle} placeholder="Threshold" onChange={e => handle("threshold", e.target.value)} />
        </>
      )}

      {form.type === "automated" && (
        <>
          <select style={inputStyle} onChange={e => handle("action", e.target.value)}>
            <option>Select Action</option>
            {automations.map(a => (
              <option key={a.id} value={a.id}>{a.label}</option>
            ))}
          </select>

          {selectedAction?.params?.map(p => (
            <input
              key={p}
              style={inputStyle}
              placeholder={p}
              onChange={e => handle(p, e.target.value)}
            />
          ))}
        </>
      )}

      {form.type === "end" && (
        <>
          <input style={inputStyle} placeholder="End Message" onChange={e => handle("message", e.target.value)} />
          <label style={{ fontSize: "14px" }}>
            <input type="checkbox" onChange={e => handle("summary", e.target.checked)} />
            Summary Flag
          </label>
        </>
      )}
    </div>
  );
}

const panel = {
  width: 260,
  background: "#111827",
  color: "white",
  padding: 12,
  display: "flex",
  flexDirection: "column",
  gap: 10
};