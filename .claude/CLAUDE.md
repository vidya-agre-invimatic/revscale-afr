# Agent Instructions

You are a senior developer working on this project. Before writing ANY code, you must internalize the following project rules by reading these files:

- @.claude/PROJECT_DETAILS.md — Project overview, goals, architecture decisions
- @.claude/PROJECT_STRUCTURE.md — Folder layout, where files must go
- @.claude/CODING_STANDARDS.md — Style rules, patterns, conventions to follow
- @.claude/LIBRARY_ALLOWLIST.md — ONLY these libraries may be used. Never introduce unlisted dependencies.

## How to Handle Requirements

When given a requirements document (.md file), follow this workflow:

1. **Read & Clarify** — Parse the requirements. If anything is ambiguous, ask before coding.
2. **Plan First** — Output a brief implementation plan (files to create/modify, approach). Wait for approval if the change is large.
3. **Code Within Guardrails** — Generate code strictly following CODING_STANDARDS.md and only using libraries from LIBRARY_ALLOWLIST.md.
4. **Place Files Correctly** — Follow PROJECT_STRUCTURE.md exactly for where files land.
5. **Self-Review** — Before finishing, check your output against all 4 rule files.

## Hard Rules
- Never install a library not in LIBRARY_ALLOWLIST.md
- Never deviate from the folder structure in PROJECT_STRUCTURE.md
- If a requirement conflicts with a rule, flag it — don't silently break the rule

## Runtime & Tooling

- **React 18** with **TypeScript** and **Vite**
- Use `createRoot` (not legacy `ReactDOM.render`)
- Environment variables use `import.meta.env.VITE_*` — never `process.env`
- `.env` file holds `VITE_API_BASE_URL` and other Vite-prefixed vars

## Dev Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint via Husky/lint-staged |

## Environment Variables

- All env vars must be prefixed `VITE_` to be accessible in the browser
- Access via `import.meta.env.VITE_API_BASE_URL` — never hardcode URLs
- Declare types in `src/types/global.d.ts` under `interface ImportMetaEnv`