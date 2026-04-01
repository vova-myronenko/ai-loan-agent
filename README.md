# AI Loan Pre-Screening Agent

## Problem Statement

Banks and fintech companies receive large volumes of loan applications that must be validated, assessed, and categorized efficiently. Manual processing is slow and error-prone, especially for initial screening.

This project demonstrates an AI Agent that automates the pre-screening process using a multi-step workflow.

---

## What the Agent Does (Scope)

- Validates loan application input
- Calculates risk level using deterministic rules
- Makes a decision: APPROVE / REVIEW / REJECT
- Generates a human-readable summary (mock or real LLM)

### Non-Scope

- Real credit bureau integrations
- Fraud detection systems
- Production-grade ML scoring models
- Persistence/database storage

---

## Business Cases Covered

- Low credit score → REVIEW
- High loan-to-income ratio → REVIEW
- Very low credit score → REJECT
- Healthy application → APPROVE

---

## Architecture Overview

<pre>
User Input
    ↓
Planner (LLM / mock)
    ↓
Executor
    ↓
Tools: 
 · Validation Tool 
 · Risk Tool 
 · Decision Tool
    ↓
Aggregation
    ↓
LLM Summary (mock / real)
    ↓
Structured Output
</pre>

---

## Agent Design Decisions

### Why Custom Orchestrator?

I chose a custom orchestrator over LangChain or other frameworks to keep the agent logic fully transparent, auditable, and dependency-light.

For a production support agent, understanding exactly what runs at each step — and being able to add guardrails, retries, and structured logging without fighting framework abstractions — outweighs the convenience of a higher-level library.

The orchestrator pattern used here (planner → executor loop with typed tool interfaces) maps directly onto LangGraph's concepts and could be migrated there if the team later needs graph-based branching or persistence.

---

## LLM Configuration

The LLM provider is configurable via `.env`.

### Default (recommended)

<pre>
LLM_PROVIDER=mock
</pre>

- No API key required
- Deterministic outputs
- Easy to run and test

### Optional: Real LLM

<pre>
LLM_PROVIDER=openai
OPENAI_API_KEY=your_key
</pre>

Steps:
1. Create API key at https://platform.openai.com/
2. Add it to `.env`

Note: This is optional and not required to run or test the project.

### Fallback Behavior

If the real LLM fails (e.g., quota exceeded), the system automatically falls back to the mock implementation.

---

## Setup Instructions

```bash
npm install
cp .env.example .env
npm run start
```

---

## Running Tests

```bash
npm run test
```

Includes:
- Unit tests for tools
- Integration test for full agent workflow

---

## Example Input

```json
{
  "name": "John",
  "income": 1000,
  "loanAmount": 6000,
  "creditScore": 580
}
```

---

## Example Output

```json
{
  "decision": "REVIEW",
  "riskLevel": "HIGH",
  "reasons": [
    "Low credit score",
    "High loan-to-income ratio"
  ],
  "summary": "Loan application is REVIEW with HIGH risk level. Reasons: Low credit score, High loan-to-income ratio."
}
```
---

## Observability

- Structured logs for each step
- Tool execution tracing
- Request-level tracking using `requestId`

---

## Trade-offs and Limitations

- Rule-based decision system (not ML-driven)
- Mock LLM by default
- No persistence layer
- Limited error recovery strategies

---

## Real-world Usage

Not in production today.

### Potential Use Cases

- Fintech startups
- Digital banks
- Lending platforms

### To Productionize

- Integrate real credit bureau APIs
- Add monitoring and alerting
- Introduce human-in-the-loop approval flows
- Ensure compliance (GDPR, financial regulations)
- Add authentication and security layers
