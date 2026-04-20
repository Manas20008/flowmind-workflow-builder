export function validateWorkflow(nodes) {
  let errors = [];

  if (!nodes.some((n) => n.data.type === "start"))
    errors.push("Missing Start Node");
  if (!nodes.some((n) => n.data.type === "end"))
    errors.push("Missing End Node");

  return {
    errors,
    score: errors.length ? 50 : 100,
  };
}