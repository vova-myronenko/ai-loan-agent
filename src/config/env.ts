import dotenv from "dotenv";

dotenv.config();

export const env = {
  llmProvider: process.env.LLM_PROVIDER || "mock",
};
