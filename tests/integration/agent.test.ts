import { runAgent } from "../../src/agent/orchestrator";

describe("Agent Integration", () => {
  it("should process full workflow", async () => {
    const input = {
      name: "John",
      income: 1000,
      loanAmount: 6000,
      creditScore: 580,
    };

    const result = await runAgent(input);

    expect(result.decision).toBeDefined();
    expect(result.riskLevel).toBeDefined();
    expect(result.summary).toBeDefined();
  });
});
