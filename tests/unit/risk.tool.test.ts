import { riskTool } from "../../src/tools/risk.tool";

describe("riskTool", () => {
  it("should return HIGH risk for low credit score", async () => {
    const input = {
      income: 1000,
      loanAmount: 2000,
      creditScore: 500,
    };

    const result = await riskTool.execute(input);

    expect(result.data?.riskLevel).toBe("HIGH");
  });
});
