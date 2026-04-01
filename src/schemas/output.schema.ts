import { z } from "zod";

export const LoanDecisionSchema = z.object({
  decision: z.enum(["APPROVE", "REJECT", "REVIEW"]),
  riskLevel: z.enum(["LOW", "MEDIUM", "HIGH"]),
  reasons: z.array(z.string()),
  summary: z.string(),
});

export type LoanDecision = z.infer<typeof LoanDecisionSchema>;
