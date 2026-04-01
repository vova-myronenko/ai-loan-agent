import { validateTool } from "../../src/tools/validate.tool";

describe("validateTool", () => {
  it("should validate correct input", async () => {
    const input = {
      name: "John",
      income: 1000,
      loanAmount: 2000,
      creditScore: 700,
    };

    const result = await validateTool.execute(input);

    expect(result.success).toBe(true);
  });

  it("should fail invalid input", async () => {
    const input = {
      name: "John",
      income: -100,
    };

    const result = await validateTool.execute(input);

    expect(result.success).toBe(false);
  });
});
