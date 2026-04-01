export function logStep(step: string, data?: any) {
  console.log(
    JSON.stringify({
      step,
      timestamp: new Date().toISOString(),
      data,
    })
  );
}
