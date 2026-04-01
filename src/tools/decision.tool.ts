import { Tool } from "../agent/types";

export const decisionTool: Tool = {
  name: "decision",

  async execute(input) {
    const { creditScore, loanAmount, income } = input;
    const ratio = loanAmount / income;

    let decision = "APPROVE";
    const reasons: string[] = [];

    if (creditScore < 600) {
      decision = "REVIEW";
      reasons.push("Low credit score");
    }

    if (ratio > 5) {
      decision = "REVIEW";
      reasons.push("High loan-to-income ratio");
    }

    if (creditScore < 500) {
      decision = "REJECT";
      reasons.push("Very low credit score");
    }

    return {
      success: true,
      data: {
        decision,
        reasons,
      },
    };
  },
};
