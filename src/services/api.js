export const getAutomations = async () => {
  return [
    { id: "send_email", label: "Send Email", params: ["to", "subject"] },
    { id: "generate_doc", label: "Generate Document", params: ["template", "recipient"] }
  ];
};

export const simulateWorkflow = async ({ nodes, edges }) => {
  const result = [];
  let current = nodes.find(n => n.data.type === "start");
  const visited = new Set();

  while (current && !visited.has(current.id)) {
    visited.add(current.id);
    result.push(`Executed: ${current.data.label}`);

    const nextEdge = edges.find(e => e.source === current.id);
    current = nodes.find(n => n.id === nextEdge?.target);
  }

  return result;
};