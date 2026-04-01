export type ToolName = "validate" | "risk" | "decision";

export interface ToolResult {
  success: boolean;
  data?: any;
  error?: string;
}

export interface Tool {
  name: ToolName;
  execute(input: any): Promise<ToolResult>;
}

export interface PlanStep {
  tool: ToolName;
  input: any;
}

export type Plan = PlanStep[];
