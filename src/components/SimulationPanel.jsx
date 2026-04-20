export default function SimulationPanel({ runWorkflow, logs, score }) {
  return (
    <div style={panel}>
      <button onClick={runWorkflow}>Run Workflow</button>
      <p>Score: {score}</p>
      {logs.map((l, i) => (
        <div key={i}>{l}</div>
      ))}
    </div>
  );
}

const panel = {
  position: "absolute",
  top: 10,
  left: "50%",
  transform: "translateX(-50%)",
  background: "#1f2937",
  padding: 10,
  color: "white",
};