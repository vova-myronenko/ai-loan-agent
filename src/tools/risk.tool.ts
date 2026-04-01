import { Tool } from "../agent/types";

export const riskTool: Tool = {
  name: "risk",

  async execute(input) {
    const { income, loanAmount, creditScore } = input;

    let riskLevel = "LOW";

    if (creditScore < 600) riskLevel = "HIGH";
    else if (creditScore < 700) riskLevel = "MEDIUM";

    const ratio = loanAmount / income;

    if (ratio > 5) riskLevel = "HIGH";

    return {
      success: true,
      data: {
        riskLevel,
        ratio,
      },
    };
  },
};
