import { z } from "zod";

export const LoanInputSchema = z.object({
  name: z.string(),
  income: z.number().positive(),
  loanAmount: z.number().positive(),
  creditScore: z.number().min(300).max(850),
});

export type LoanInput = z.infer<typeof LoanInputSchema>;
