import { Tool, Plan } from "./types";
import { logStep } from "../utils/logger";

export async function executePlan(plan: Plan, tools: Tool[], requestId: string) {
  const results: Record<string, any> = {};

  for (const step of plan) {
    const tool = tools.find((t) => t.name === step.tool);

    if (!tool) {
      throw new Error(`Tool not found: ${step.tool}`);
    }

    logStep("tool:start", {
      requestId,
      tool: tool.name,
      input: step.input,
    });

    try {
      const result = await tool.execute(step.input);

      if (!result.success) {
        logStep("tool:error", {
          tool: tool.name,
          error: result.error,
        });

        throw new Error(result.error || "Unknown tool error");
      }

      logStep("tool:success", {
        tool: tool.name,
        result: result.data,
      });

      results[tool.name] = result.data;

    } catch (err: any) {
      logStep("tool:exception", {
        tool: tool.name,
        message: err.message,
      });

      throw new Error(
        `Step failed: ${tool.name} → ${err.message}`
      );
    }
  }

  logStep("plan:completed", results);

  return results;
}
