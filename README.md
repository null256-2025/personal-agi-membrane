# Personal AGI Membrane

Swipe Reality Gate MVP for the Series T pitch.

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- OpenAI API route handlers with fixture fallback

## Setup

```bash
npm install
npm run dev
```

Create `.env.local` from `.env.example` and paste your key manually:

```bash
OPENAI_API_KEY=sk-proj-...
OPENAI_MODEL=gpt-5-nano
```

The app still runs without an API key by using fixture analysis data.

## MVP Surface

- One-screen mobile-first Swipe Reality Gate
- Private / Public / Business role lenses
- Right swipe to approve, left swipe to stop, down swipe to add instruction
- Long press or inspect button for Agent Trace
- Glass preview mock showing future smart-glass experience
- `/api/analyze` and `/api/revise-gate` endpoints
