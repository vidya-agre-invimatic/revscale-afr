# /implement — Feature Implementation Command

## Purpose

Implement a feature from an AFR (Application Feature Requirements) markdown document, strictly following all project rules.

---

## Step 0 — Hard Stop: Require AFR Document

**Before doing anything else**, check whether the user has provided an AFR `.md` file as an argument or attached it to this command.

If NO `.md` file is provided, **stop immediately** and respond with:

> **Error: No AFR document provided.**
>
> The `/implement` command requires an AFR specification file.
>
> Usage: `/implement <path-to-afr-file.md>`
>
> Example: `/implement .claude/specs/step1-credai-form.md`
>
> Please provide the AFR `.md` file and run the command again.

**Do not proceed past this point without a valid `.md` file.**

---

## Step 1 — Load Project Rules

Read all four rule files before writing any code:

- @.claude/PROJECT_DETAILS.md
- @.claude/PROJECT_STRUCTURE.md
- @.claude/CODING_STANDARDS.md
- @.claude/LIBRARY_ALLOWLIST.md

---

## Step 2 — Parse the AFR Document

Read the provided AFR `.md` file in full. Extract:

- Feature name and scope
- Steps / screens involved
- Fields, validation rules, and error messages
- API endpoints and payload shapes
- Conditional logic (membership type, firm type, etc.)
- File upload specs (types, sizes, limits) — note which steps need a `*.service.ts`
- Date fields — note where `moment` will be used
- State transitions and lock rules

---

## Step 3 — Clarify Before Coding

If any requirement is ambiguous or conflicts with a project rule, **ask the user to clarify before writing any code**. List all questions at once — do not ask one at a time.

Flag explicitly if a requirement would force a rule violation (e.g., a library not in LIBRARY_ALLOWLIST.md).

---

## Step 4 — Output an Implementation Plan

Before writing code, output a plan that lists:

1. Files to create (with full paths per PROJECT_STRUCTURE.md)
2. Files to modify (with reason)
3. Approach for forms, state, API hooks, and routing
4. Any conditional logic that needs special handling

Wait for the user to approve the plan before proceeding. For small, isolated changes (single component, no routing changes), you may proceed without explicit approval — use judgment.

---

## Step 5 — Implement

Write code strictly following:

- **PROJECT_STRUCTURE.md** — exact folder and file placement
- **CODING_STANDARDS.md** — naming, patterns, no business logic in pages
- **LIBRARY_ALLOWLIST.md** — only approved libraries
- **PROJECT_DETAILS.md** — domain rules, membership type logic, field specs

### Mandatory implementation checklist

- [ ] All forms use **Formik** + **Yup** schemas in `*.schema.ts`
- [ ] Every field has: label · input · Yup validation · error message from AFR
- [ ] Multi-step forms: validate **current step's schema only** on Next; full schema on final submit
- [ ] API hooks live in `*.api.ts` — never called directly from components
- [ ] File upload / download logic lives in `*.service.ts` under `src/services/`
- [ ] All pages are **lazy-loaded** via `React.lazy`
- [ ] Auth routes (`/login`) redirect logged-in users to their role home — never render the login page for authenticated users
- [ ] Auto-uppercase applied to: GST, PAN, ROC, Commencement Number, Maha RERA Number, Associate PAN
- [ ] File uploads: client-side MIME + size validation before `POST /documents`
- [ ] 401 responses redirect to `/login`; 400/500 show user-facing error
- [ ] No `any` types — all API responses fully typed
- [ ] No `dangerouslySetInnerHTML`
- [ ] No raw `style` props — Tailwind classes only; use CREDAI design tokens (`primary-*`, `text-heading-*`, etc.) from `tailwind.config.js`
- [ ] Sensitive data (JWT, OTP) never in `localStorage`
- [ ] Redux Toolkit for UI/auth state; TanStack Query for server state
- [ ] Auto-save on blur + 30s interval uses `useMutation` with silent failure
- [ ] Date handling uses `moment` — no custom date parsing
- [ ] No function exceeds 100 lines; one responsibility per file
- [ ] All file names are **kebab-case** (e.g. `application-form.tsx`, `applicant.api.ts`)

---

## Step 6 — Self-Review

Before reporting done, verify against all four rule files:

| Check | Rule source |
|-------|-------------|
| File extensions: `.tsx` only if JSX present | PROJECT_STRUCTURE.md §1 |
| File names are kebab-case | CODING_STANDARDS.md §Naming |
| Files placed in correct folders | PROJECT_STRUCTURE.md §2 |
| No unlisted library imported | LIBRARY_ALLOWLIST.md |
| Naming conventions followed | CODING_STANDARDS.md |
| No business logic in page components | CODING_STANDARDS.md |
| Multi-step: current step schema validated on Next, full schema on submit | CODING_STANDARDS.md §Forms |
| File upload/download logic in `*.service.ts`, not in components or `*.api.ts` | PROJECT_STRUCTURE.md §2 |
| CREDAI design tokens used (`primary-*`, `text-heading-*`) — no arbitrary colors | CODING_STANDARDS.md §UI |
| Date handling uses `moment` — no custom date parsing | LIBRARY_ALLOWLIST.md |
| No function exceeds 100 lines | CODING_STANDARDS.md §UI |
| Auth routes inaccessible to logged-in users | CODING_STANDARDS.md §Routing |
| Validation error messages match AFR exactly | PROJECT_DETAILS.md |
| Conditional fields match membership/firm type rules | PROJECT_DETAILS.md §5 |

Report any deviations found and how they were resolved. If a deviation could not be resolved without violating a rule, flag it to the user.

---

## Step 7 — Output Completion Message (MANDATORY — DO NOT SKIP)

> **CRITICAL:** Skipping this step is a failure. Write/Edit tool calls alone are NOT sufficient output. The user cannot see tool calls — they only see assistant message text. If you do not send this message, the user will see a blank response and think the command failed.

After all Write/Edit tool calls are complete, immediately output the following block as plain assistant message text **in the same response turn**. Fill in the bracketed values with real data:

---

**Feature implemented successfully.**

- **AFR:** `{AFR filename used}`
- **Files created:** {count}
  - `{file path 1}`
  - `{file path 2}`
  - *(continue for each file)*
- **Files modified:** {count}
  - `{file path 1}`
  - *(continue for each file)*
- **Summary:** {one-line description of what was implemented}

---

Do not end your response without this block appearing as visible text to the user.
