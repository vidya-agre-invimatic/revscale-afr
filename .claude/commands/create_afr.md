# /create_afr — Generate an AFR Document

Generates a fully populated AFR (Application Functional Requirement) document and saves it to the `project_rules/AFR/` folder.

---

## Step 0 — STOP if no description provided

**This is a hard gate. Do not read any project files or generate any content until it is passed.**

Check `$ARGUMENTS`:

- If `$ARGUMENTS` is empty, blank, or contains only a Figma URL with no feature description:
  - Output **only** the questions below.
  - **Stop immediately. Do not proceed to Step 1 or any further steps.**
  - Wait for the user to reply with a feature description before doing anything else.

Questions to output (as a single message):

> **To generate the AFR, I need a few things:**
>
> 1. **Feature description** — What does this feature do? Which user role performs it? What screens/forms are involved? Which API endpoints does it touch (if known)?
> 2. **Figma MCP URL** *(optional)* — Paste the Figma frame/section URL if a design exists. Skip or type "none" if this feature is defined purely by business logic.
> 3. **Backend AFR path** *(optional)* — If the backend team has provided an AFR `.md` file with API specs, paste the file path here. Its endpoint details will be used as the source of truth for Section 6. (Type "none" if not available.)

**Do not proceed past this step until the user provides at least a feature description. Figma MCP URL is not required — proceed without it if the user omits it.**

---

Once the user replies, confirm you have received a feature description before continuing. If their reply still contains no description, repeat the questions and stop again.

If `$ARGUMENTS` contains a feature description but **no** Figma URL, do **not** ask for it — record it as `Not provided` and continue directly to Step 1. Only ask for the backend AFR path if it was not mentioned:

> **Backend AFR path** *(optional)* — Path to the backend AFR `.md` file with API specs, if available. (Type "none" if not available.)

Wait for the response, then continue to Step 1.

---

## Step 1 — Read project context

Read all four project rule files before writing anything:

- `.claude/PROJECT_DETAILS.md` — business context, user roles, workflow, tech stack, API standards
- `.claude/PROJECT_STRUCTURE.md` — folder layout and where files must live
- `.claude/CODING_STANDARDS.md` — naming conventions, patterns, style rules
- `.claude/LIBRARY_ALLOWLIST.md` — approved libraries only

---

## Step 2 — Derive AFR metadata from the description

From `$ARGUMENTS` (or the user's response from Step 0), extract or infer:

- **Feature name** — a concise human-readable title (e.g. "Applicant OTP Login")
- **FR-ID** — scan the `project_md/AFR/` folder for existing files named `AFR-FE-NNN-*.md`; increment the highest number by 1 and zero-pad to 3 digits. If no files exist, start at `AFR-FE-001`.
- **File name** — `AFR-FE-{NNN}-{feature-name-in-kebab-case}.md` placed in the `project_md/AFR/` folder
- **Today's date** — use the current date from the system context (YYYY-MM-DD)
- **Actor** — which user role(s) from PROJECT_DETAILS.md perform this action (Applicant, Scrutinizer, etc.)
- **Parent requirement** — the closest matching step or section from PROJECT_DETAILS.md (e.g. "Step 1 – CREDAI Form")
- **Tech stack references** — derive the relevant libraries from LIBRARY_ALLOWLIST.md and CODING_STANDARDS.md that apply to this feature (e.g. Formik + Yup for forms, TanStack Query for API hooks, Redux Toolkit for auth state)
- **Figma MCP URL** — extract from the user's input (anything after `Figma MCP:` in the prompt, or from Step 0's second answer). This is **optional** — if absent, omitted, or "none", record as `Not provided` and continue without blocking.
- **Backend AFR path** — extract from the user's input (Step 0's third answer). If provided, read that file in full now and store its API contract for use in Step 3 Section 6. If blank or "none", record as `Not provided` and fall back to `PROJECT_DETAILS.md §7` for endpoint details.

---

## Step 3 — Generate the AFR document

Using the AFR template structure below, populate every section with specifics drawn from the user's description and the project context files. Do **not** leave placeholder text — replace every `[bracket]` with a real value.

Follow this template structure (from `.claude/AFR.md`):

### Sections to populate:

**1. Document Control** — fill in all metadata fields: Document Name, FR-ID, Derived From, Parent Requirement, Version (1.0), Author (Development Team), Status (Draft), date, and **Figma MCP** (the design URL, or "Not provided").

**2. Overview**
- 2.1 Purpose — what the feature does, who does it, via which UI mechanism
- 2.2 Scope — list the specific React responsibilities (form, validation, API integration, state)
- 2.3 Out of Scope — what is handled by backend or a separate AFR

**3. Feature Flow** — describe the full user journey: where the user comes from, what they do on screen, what happens on success, what data is stored downstream.

**4. Screen: [Screen Name]**
- 4.1 Fields & Constraints — table with Field, Required, Format, Notes; derive from PROJECT_DETAILS.md field specs
- 4.2 Client-side Validation — inline validation rules aligned with CODING_STANDARDS.md
- 4.3 Validation Messages — exact error strings from PROJECT_DETAILS.md

**5. Figma Design Reference**

Include this section so the coding agent knows exactly where to fetch the design:

```
Figma MCP: <URL from user input, or "Not provided">
```

- If a URL is provided: the coding agent must use the Figma MCP tool to fetch component specs, colours, spacing, and typography from this frame before writing any UI code.
- If not provided: note `No Figma design available — UI implementation must be derived from the business logic, field specs, and validation rules in this AFR.` Do **not** treat this as a blocker; the AFR is still complete and usable.

**6. API Integration Details**
- **Source of truth:** If a backend AFR was provided in Step 0, use its endpoint specs exclusively for this section. If no backend AFR was provided, derive endpoint details from `PROJECT_DETAILS.md §7`.
- 6.1 Overview — list all endpoints this feature touches; note whether specs came from the backend AFR or PROJECT_DETAILS.md
- 6.2+ One sub-section per endpoint: Method + path, description, auth requirement, request headers, request body + schema table, success response (200), all error responses (400/404/500)

**7. Frontend Integration Requirements**
- 7.1 Primary Flow — On Page Load, On Submit, On Success; reference Formik + TanStack Query patterns
- 7.2 Secondary Flow (if applicable) — e.g. Resend OTP, Save Draft

**8. Error Handling**
- 8.1 Client-side validation errors — display rules per CODING_STANDARDS.md
- 8.2 API Errors table — Error type, display method (inline/snackbar), message, UI action
- 8.3 Error display summary table

**9. Navigation Rules** — table mapping conditions to navigation outcomes (next screen, stay, redirect)

**10. State Management Rules** — what to store (Redux/context), what NOT to store (no OTP in localStorage per CODING_STANDARDS.md), what to clear, what is passed from previous screens

**11. Security Requirements** — derive from CODING_STANDARDS.md §Security and PROJECT_DETAILS.md §11 (Non-Functional):
- No sensitive data in localStorage (JWT in memory / httpOnly cookie)
- No dangerouslySetInnerHTML
- Client-side MIME + size validation before upload
- Auto-uppercase fields as specified

**12. UX Recommendations** — auto-focus, loading states, paste support, feedback states; reference PROJECT_DETAILS.md §11 accessibility requirements (44px touch targets, ARIA labels, scroll-to-first-error)

**13. Dependencies**
- 13.1 Upstream — which screen provides data to this screen and how (route params, Redux, context)
- 13.2 Downstream — which screen consumes data from this screen
- 13.3 API Dependencies — list all endpoints with method + path + purpose

**14. Open Items / TBD** — flag anything that cannot be derived from the description or the project files (missing field specs, unclear navigation, unresolved API details)

**15. Change Log** — Version 1.0, today's date, Development Team, "Initial version"

---

## Step 4 — Self-review before writing

Before saving the file, verify:

- [ ] No `[bracket]` placeholder text remains in the document
- [ ] File name matches `AFR-FE-{NNN}-{kebab-case-feature-name}.md`
- [ ] File is placed in the `project_rules/AFR/` folder at the project root
- [ ] All field names match PROJECT_DETAILS.md exactly
- [ ] All libraries referenced are in LIBRARY_ALLOWLIST.md (Formik, Yup, TanStack Query, Axios, Redux Toolkit, Tailwind CSS, moment)
- [ ] No disallowed libraries mentioned (react-hook-form, MUI, Chakra UI, SWR, zustand, RTK Query, etc.)
- [ ] File extension rules from PROJECT_STRUCTURE.md are noted where code references appear
- [ ] Security rules from CODING_STANDARDS.md are reflected in Section 11
- [ ] Error messages match verbatim strings from PROJECT_DETAILS.md where applicable
- [ ] Section 5 (Figma Design Reference) contains the URL or explicitly states "Not provided" with a note that UI derives from business logic in the AFR
- [ ] Document Control table includes the Figma MCP row (value may be "Not provided" — this is valid)
- [ ] Section 6 API specs sourced from backend AFR if provided; otherwise from PROJECT_DETAILS.md §7 — not mixed or guessed
- [ ] Section 6.1 notes the source of the API specs (backend AFR path or PROJECT_DETAILS.md)

---

## Step 5 — Write the file

Save the completed document to: `project_md/AFR/AFR-FE-{NNN}-{kebab-case-feature-name}.md`

---

## Step 6 — Output completion message (MANDATORY — DO NOT SKIP)

> **CRITICAL:** Skipping this step is a failure. The Write tool call alone is NOT sufficient output. The user cannot see tool calls — they only see assistant message text. If you do not send this message, the user will see a blank response and think the command failed.

After the Write tool call returns successfully, immediately output the following block as plain assistant message text **in the same response turn**. Fill in the bracketed values with real data:

---

**AFR document created successfully.**

- **File:** `project_md/AFR/{filename}.md`
- **FR-ID:** `AFR-FE-{NNN}`
- **Feature:** `{Feature Name}`
- **Sections:** 15
- **Status:** Draft
- **Summary:** {one-line description of what the AFR covers}

---

Do not end your response without this block appearing as visible text to the user.
