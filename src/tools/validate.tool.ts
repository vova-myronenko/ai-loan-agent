import { Tool } from "../agent/types";
import { LoanInputSchema } from "../schemas/input.schema";

export const validateTool: Tool = {
  name: "validate",

  async execute(input) {
    const result = LoanInputSchema.safeParse(input);

    if (!result.success) {
      return {
        success: false,
        error: result.error.message,
      };
    }

    return {
      success: true,
      data: result.data,
    };
  },
};
