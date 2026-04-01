import { runAgent } from "./agent/orchestrator";

async function main() {
  const input = {
    name: "John",
    income: 1000,
    loanAmount: 6000,
    creditScore: 580,
  };

  const result = await runAgent(input);

  console.log("FINAL RESULT:", result);
}

main();
