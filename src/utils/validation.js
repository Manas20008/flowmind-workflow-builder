export function validateWorkflow(nodes, edges) {
  const errors = [];
  const suggestions = [];

  const start = nodes.filter(n => n.data.type === "start");
  const end = nodes.filter(n => n.data.type === "end");

  if (start.length !== 1) errors.push("Must have exactly one Start Node");
  if (end.length === 0) errors.push("Missing End Node");

  const visited = new Set();

  function dfs(id) {
    if (visited.has(id)) {
      errors.push("Cycle detected");
      return;
    }
    visited.add(id);
    edges.filter(e => e.source === id).forEach(e => dfs(e.target));
  }

  if (start[0]) dfs(start[0].id);

  return {
    errors,
    suggestions,
    score: Math.max(0, 100 - errors.length * 10)
  };
}