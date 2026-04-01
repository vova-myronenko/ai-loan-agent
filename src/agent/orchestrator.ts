import { createPlan } from "./planner";
import { executePlan } from "./executor";
import { validateTool } from "../tools/validate.tool";
import { riskTool } from "../tools/risk.tool";
import { decisionTool } from "../tools/decision.tool";
import { generateSummary } from "../services/llm.service";
import { LoanDecisionSchema, LoanDecision } from "../schemas/output.schema";
import { logStep } from "../utils/logger";
import crypto from "crypto";

const tools = [validateTool, riskTool, decisionTool];

export async function runAgent(input: any): Promise<LoanDecision> {
  // Generate requestId ONCE per request
  const requestId = crypto.randomUUID();

  // Guardrail: basic input validation
  if (!input || typeof input !== "object") {
    throw new Error("Invalid input: must be an object");
  }

  logStep("agent:start", { requestId, input });

  try {
    const plan = await createPlan(input);

    logStep("agent:plan", { requestId, plan });

    const results = await executePlan(plan, tools, requestId);

    logStep("agent:tools:result", { requestId, results });

    const final = {
      decision: results.decision.decision,
      riskLevel: results.risk.riskLevel,
      reasons: results.decision.reasons,
    };

    const summary = await generateSummary(final);

    const output = {
      ...final,
      summary,
    };

    const validatedOutput = LoanDecisionSchema.parse(output);

    logStep("agent:result", { requestId, output: validatedOutput });

    return validatedOutput;

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    logStep("agent:error", {
      requestId,
      message,
    });

    throw new Error(`Agent failed: ${message}`);
  }
}
