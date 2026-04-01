import { env } from "../config/env";
import { retry } from "../utils/retry";
import { SummaryInput } from "../schemas/summary.schema";

// Lazy import to avoid requiring API key in mock mode
let openaiClient: any = null;

async function getClient() {
  if (!openaiClient) {
    const { OpenAI } = await import("openai");

    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openaiClient;
}

export async function generateSummary(data: SummaryInput): Promise<string> {
  try {
    if (env.llmProvider === "mock") {
      return mockSummary(data);
    }

    return await retry(() => realSummary(data));

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn("LLM failed, falling back to mock:", message);

    return mockSummary(data);
  }
}

// MOCK (default)
function mockSummary(data: SummaryInput): string {
  const { decision, riskLevel, reasons } = data;

  const reasonsText =
    Array.isArray(reasons) && reasons.length > 0
      ? ` Reasons: ${reasons.join(", ")}.`
      : "";

  return `Loan application is ${decision} with ${riskLevel} risk level.${reasonsText}`;
}

// REAL (OpenAI)
async function realSummary(data: SummaryInput): Promise<string> {
  const client = await getClient();

  const prompt = `
You are a financial assistant.

Generate a concise, professional summary for a loan application decision.

Input:
${JSON.stringify(data, null, 2)}

Requirements:
- 1-2 sentences
- Mention decision, risk level, and key reasons
- Clear and professional tone
`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are a helpful financial assistant.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.3,
  });

  return response.choices[0]?.message?.content?.trim() || "No summary generated";
}
