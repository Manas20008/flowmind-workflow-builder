import { useState } from "react";
import { simulateWorkflow } from "../services/api";

export default function SimulationPanel({ nodes, edges }) {
  const [logs, setLogs] = useState([]);

  const run = async () => {
    const result = await simulateWorkflow({ nodes, edges });
    setLogs(result);
  };

  return (
    <div style={panel}>
      <button onClick={run}>Run Workflow</button>
      {logs.map((l, i) => <div key={i}>{l}</div>)}
    </div>
  );
}

const panel = {
  position: "absolute",
  top: 10,
  left: 220,
  background: "#111827",
  color: "white",
  padding: 10
};