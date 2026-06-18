# /debug — Bug Investigation & Fix Command

## Purpose

Diagnose and fix a reported bug, strictly following all project rules. No new libraries. No unrelated cleanup.

---

## Step 0 — Require a Bug Description

**Before doing anything else**, check whether the user has described the bug via `$ARGUMENTS` or an attached message.

If NO description is provided, **stop immediately** and respond with:

> **Error: No bug description provided.**
>
> Usage: `/debug <description of the bug>`
>
> Example: `/debug Step 3 firm type change does not clear ROC number field`
>
> Please describe the issue and run the command again.

**Do not proceed without a bug description.**

---

## Step 1 — Load Project Rules

Read all four rule files before touching any code:

- @.claude/PROJECT_DETAILS.md
- @.claude/PROJECT_STRUCTURE.md
- @.claude/CODING_STANDARDS.md
- @.claude/LIBRARY_ALLOWLIST.md

---

## Step 2 — Understand the Bug

Parse the bug description and identify:

- Which step / screen / component is affected
- What the expected behaviour is (from PROJECT_DETAILS.md if not stated)
- What the actual behaviour is
- Whether the bug is in UI logic, form validation, API layer, state management, routing, or file upload

---

## Step 3 — Locate the Root Cause

Search the codebase for the relevant files. Typical places to look by symptom:

| Symptom | Look in |
|---------|---------|
| Field not clearing / not updating | Formik `initialValues`, `resetForm`, `setFieldValue` in the component or schema |
| Validation not triggering | `*.schema.ts` Yup schema; step schema selection in multi-step form |
| API call not firing / wrong payload | `*.api.ts` hook; `useMutation` call site in component |
| Wrong data showing / stale cache | TanStack Query `queryKey`, `invalidateQueries`, `staleTime` |
| Conditional field shown/hidden incorrectly | Membership type / firm type conditional logic in component; cross-reference PROJECT_DETAILS.md §5 |
| Route guard not working | `ProtectedRoute`, `RoleRoute`, or `authSlice` in Redux |
| File upload rejected client-side | MIME/size validation in `*.service.ts` |
| Auth redirect not happening | 401 interceptor in `src/services/api.ts` |
| Redux state wrong | Slice reducer, action dispatch, selector |
| Auto-save not triggering / saving wrong data | blur handler, 30s interval, `useMutation` silent failure path |

Explain your reasoning: why this file/function is the likely source.

---

## Step 4 — Rank Possible Fixes

List 2–3 candidate fixes, ranked by confidence (highest first). For each:

- State what the fix is
- Explain why you believe it solves the root cause
- Note any risk or side-effect (e.g., touching shared logic that affects other steps)

---

## Step 5 — Implement the Highest-Confidence Fix

Apply only the fix ranked #1. Do not refactor surrounding code. Do not "clean up while you're in there."

Follow all project rules:

- **CODING_STANDARDS.md** — naming, no business logic in pages, Tailwind only, no `any`
- **LIBRARY_ALLOWLIST.md** — no new libraries introduced
- **PROJECT_STRUCTURE.md** — do not move files or create new ones unless the bug requires it
- **PROJECT_DETAILS.md** — verify the fix aligns with domain rules (field specs, validation messages, step flow, conditional logic)

---

## Step 6 — Self-Review

Before reporting done, verify the fix does not violate any rule:

| Check | Rule source |
|-------|-------------|
| No new library imported | LIBRARY_ALLOWLIST.md |
| No business logic added to a page component | CODING_STANDARDS.md |
| Validation error messages match spec exactly | PROJECT_DETAILS.md |
| Conditional logic matches membership/firm type rules | PROJECT_DETAILS.md §5 |
| API response types remain fully typed — no `any` | CODING_STANDARDS.md |
| File names unchanged and still kebab-case | CODING_STANDARDS.md §Naming |
| No `dangerouslySetInnerHTML` introduced | CODING_STANDARDS.md §Security |
| No hardcoded hex colors | CODING_STANDARDS.md §UI |
| Auto-save path still uses `useMutation` with silent failure | CODING_STANDARDS.md §Forms |

If a rule violation was unavoidable, flag it explicitly — do not silently break the rule.

---

## Step 7 — Output Completion Message (MANDATORY — DO NOT SKIP)

> **CRITICAL:** Skipping this step is a failure. Write/Edit tool calls alone are NOT sufficient output. The user cannot see tool calls — they only see assistant message text. If you do not send this message, the user will see a blank response and think the command failed.

After all Write/Edit tool calls are complete, immediately output the following block as plain assistant message text **in the same response turn**. Fill in the bracketed values with real data:

---

**Bug fixed.**

- **Root cause:** {one sentence describing the root cause}
- **Fix applied:** {what was changed and why it resolves the bug}
- **Files modified:** {count}
  - `{file path 1}` — {what changed}
  - `{file path 2}` — {what changed}
  - *(continue for each file)*
- **Fixes not applied:** {if ranked fix #2 or #3 were skipped, state why}
- **Rule violations:** None *(or describe if unavoidable)*

---

Do not end your response without this block appearing as visible text to the user.
