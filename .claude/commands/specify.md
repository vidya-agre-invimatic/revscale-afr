# /specify — Clarify Requirements Before AFR

**Usage**: `/specify <feature description or requirements>`

## Step 0 — Collect Upfront Inputs

Before doing anything else, check `$ARGUMENTS` for the following three inputs. If any are missing, ask for them now and wait for the user to reply before proceeding.

**Required inputs:**

> **To clarify requirements and generate the AFR, I need a few things:**
>
> 1. **Feature description** — What does this feature do? Which user role performs it? What screens/forms are involved? Which API endpoints does it touch (if known)?
> 2. **Design reference** *(optional)* — Provide either a Figma MCP URL (for Figma designs) or a path to a screenshot/image file (for visual references). Skip or type "none" if this feature is defined purely by business logic with no design reference.
> 3. **Backend AFR path** *(optional)* — If the backend team has provided an AFR `.md` file with API specs, paste the file path here. (Type "none" if not available.)

Rules:
- If `$ARGUMENTS` contains a feature description, skip asking for it.
- Design reference (Figma URL or screenshot path) is **optional**. Do **not** block or re-ask if the user omits it or says "none" — record it as `Not provided` and continue.
- If all inputs are present in `$ARGUMENTS`, skip this step entirely.
- Store all three values — they will be passed to `/create_afr` in Step 5.

---

## Purpose

Before creating an AFR document, surface questions that would block or change the implementation. This command acts as a requirements interview — ask the right questions now so the AFR is unambiguous.

## Input Resolution

`$ARGUMENTS` can be either plain text or a path to a `.md` file. Resolve the input before doing anything else:

1. **If `$ARGUMENTS` ends with `.md`**:
   - Use the Read tool to load the file at that path
   - If the file does not exist, respond with:
     ```
     Error: File not found — "$ARGUMENTS"
     Check the path and try again.
     ```
     Do not proceed further.
   - Use the **file contents** as the requirements input for all subsequent steps

2. **Otherwise**: treat `$ARGUMENTS` directly as the requirements text

The resolved requirements are referred to as `REQUIREMENTS` in all steps below.

---

## Step 1 — Parse the Requirements

Read `REQUIREMENTS` carefully. Extract:

- **Core intent**: What is the user ultimately trying to achieve?
- **Entities involved**: What data, users, or systems are mentioned?
- **Implied behaviours**: What must be true for this to work that wasn't stated?
- **Constraints**: Any deadlines, performance, security, or compliance hints?

---

## Step 2 — Identify Gaps

Using the spec-template structure as a checklist, identify what is missing or ambiguous. Reference these categories:

### User & Scope Gaps
- Who are the users? (role, auth state, permissions)
- What is the entry point / trigger for this feature?
- Are there multiple user types with different flows?

### Functional Gaps
- What are the success and failure states?
- Are there states that need to persist? For how long?
- What validations are required on inputs?
- Are there rate limits, retries, or timeouts implied?

### Integration Gaps
- Does this touch an existing API or require a new one?
- Are there third-party services involved (email, SMS, payment)?
- What happens if the external service is unavailable?

### UX / UI Gaps
- Are there loading, empty, or error states to design?
- What happens on mobile vs desktop?
- Is there a redirect or navigation flow after success/failure?

### Non-Functional Gaps
- Any performance expectations (response time, concurrency)?
- Audit / logging requirements?
- Security constraints (who can access this, data sensitivity)?

---

## Step 3 — Ask Only What Matters

Do **not** ask about things that:
- Are clearly stated in `REQUIREMENTS`
- Can be reasonably defaulted (e.g., standard form validation patterns)
- Are implementation details (how, not what)

**If there are no gaps** — i.e., the requirements are complete, unambiguous, and all categories above are fully covered — **skip Steps 3 and 4 entirely** and proceed directly to Step 5 (hand off to `/create_afr`). Do not output a clarification block; do not ask the user to confirm; just proceed.

**Format your questions as a numbered list**, grouped by category. For each question:
- State what you need to know
- Explain briefly why it matters for the spec
- Offer 2–3 likely options where applicable

**Limit to a maximum of 10 questions.** Prioritise the ones that would most change the scope or design.

---

## Step 4 — Output Format

Respond with this structure:

```
## Requirements Clarification: [Feature Name]

I've reviewed your requirements. Before I create the AFR document, I need to clarify a few things:

### [Category — e.g., User & Scope]

**Q1**: [Question]
*Why it matters*: [brief reason]
*Options*: A) … B) … C) …

**Q2**: [Question]
...

### [Next Category]

**Q3**: ...

---
Once you answer these, I'll generate the full AFR specification.
```

---

## Step 5 — Hand off to /create_afr

> **CRITICAL: This step is mandatory. It must execute in every run of `/specify` — whether or not any clarifying questions were asked. There is no exit path from `/specify` that does not end in `/create_afr` being invoked. Stopping before this step is a failure.**

Do the following **now**, without waiting for any further user input:

1. **Consolidate** the original `REQUIREMENTS` text with all Q&A answers (if any) into a single enriched requirements block. If there were no questions, the consolidated block is just `REQUIREMENTS` as-is.
2. **Append** the design reference (Figma URL or screenshot path) and backend AFR path collected in Step 0.
3. **Immediately read** `.claude/commands/create_afr.md` using the Read tool.
4. **Execute every step in `create_afr.md` in full**, using the consolidated requirements as the input — exactly as if the user had invoked `/create_afr` directly with that text.

The full `/create_afr` workflow must execute — including:
- Reading all four project context files (PROJECT_DETAILS.md, PROJECT_STRUCTURE.md, CODING_STANDARDS.md, LIBRARY_ALLOWLIST.md)
- Deriving the correct FR-ID by scanning `project_md/AFR/`
- Populating all 15 sections of the AFR template
- Running the self-review checklist before writing
- Writing the file to `project_md/AFR/AFR-FE-{NNN}-{kebab-case}.md`
- Outputting the mandatory completion message (Step 6 of `create_afr.md`)

**Do not write any AFR content inline. Do not ask the user for permission to proceed. Do not stop after the Q&A. Just do it.**

---

## Rules (from spec-template.md)

- User stories must be independently testable and prioritised (P1, P2, P3…)
- Each story must deliver standalone value
- Functional requirements use FR-### identifiers
- Constitution-driven requirements must be addressed: FR-SEC, FR-AUD, FR-DB, FR-RES
- Success criteria must be measurable and technology-agnostic
- Flag anything that is unclear with `[NEEDS CLARIFICATION: reason]`
