import { Plan } from "./types";

export async function createPlan(input: any): Promise<Plan> {
  // mock planner (LLM can be implemented later)
  return [
    { tool: "validate", input },
    { tool: "risk", input },
    { tool: "decision", input },
  ];
}
