import { decisionTool } from "../../src/tools/decision.tool";

describe("decisionTool", () => {
  it("should reject very low credit score", async () => {
    const input = {
      income: 1000,
      loanAmount: 2000,
      creditScore: 400,
    };

    const result = await decisionTool.execute(input);

    expect(result.data?.decision).toBe("REJECT");
  });
});
