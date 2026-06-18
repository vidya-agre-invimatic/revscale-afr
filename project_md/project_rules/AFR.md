# AFR-FR-[ID]-FE: [Feature Name] – React JS

---

## 1. Document Control

| Field | Value |
|-------|-------|
| Document Name | AFR-FR-[ID]-FE: [Feature Name] |
| Functional Requirement ID | FR-[X.X]-FE |
| Derived From (Backend AFR) | AFR-FR-[X.X]: [Backend Feature Name] |
| Parent Requirement | FR-[X]: [Parent Feature Group] |
| Version | 1.0 |
| Author | Development Team |
| Reviewers | Tech Lead, QA Lead, Product Manager |
| Status | Draft |
| Last Updated | YYYY-MM-DD |

---

## 2. Overview

### 2.1 Purpose
This document defines the frontend functional requirements for **[Feature Name]** functionality derived from backend AFR-FR-[ID]. The UI shall allow **[actor]** to **[primary action]** via **[method — e.g. a form, OTP input, file upload]**.

### 2.2 Scope
- React JS frontend only
- API-driven [feature description]
- [Core UI responsibility 1]
- [Core UI responsibility 2]
- [Core UI responsibility 3]

### 2.3 Out of Scope
- [Excluded UI concern 1] (handled by backend / separate AFR)
- [Excluded UI concern 2] (covered in separate FE document)
- [Excluded UI concern 3]

---

## 3. [Feature] Flow

- [Describe the user journey leading into this screen — what screen did the user come from]
- [Any prerequisite steps, data, or state dependencies from previous screens]
- [What the user must do on this screen]
- [What happens after successful completion — next destination]
- [Data to store after success and why it is needed downstream]

---

## 4. Screen: [Screen Name]

### 4.1 Fields & Constraints

| Field | Required | Format | Notes |
|-------|----------|--------|-------|
| [Field 1] | Yes / No | [e.g. string, 6-digit numeric, email] | [Any additional constraint] |
| [Field 2] | Yes / No | [format] | |

### 4.2 Client-side Validation
- Inline validation displayed below each field
- Error text color: red
- Block form submission on any validation failure

### 4.3 Validation Messages
- "[Field] is required"
- "[Field] must be [format/constraint]"

---

## 5. API Integration Details

### 5.1 Overview
This section defines the complete API integration requirements for the [Feature Name] feature. The frontend must interact with the following endpoints:

1. **[Action 1]** – `[METHOD] /api/v1/[resource]/[action]`
2. **[Action 2]** – `[METHOD] /api/v1/[resource]/[action]`

---

### 5.2 Endpoint [N]: [Action Name]

**Endpoint:** `[METHOD] /api/v1/[resource]/[action]`

**Description:** [What this endpoint does and its business impact.]

**Authentication:** [Not required (public endpoint) | Required — include `Authorization: Bearer <token>` header]

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "field1": "string",
  "field2": "string"
}
```

**Request Body Schema:**

| Field | Type | Required | Constraints | Description |
|-------|------|----------|-------------|-------------|
| field1 | string | Yes | [constraint] | [description] |
| field2 | string | Yes | [constraint] | [description] |

**Success Response (200 OK):**
```json
{
  "statusCode": 200,
  "message": "[Success message shown to user]",
  "data": {
    "field1": "value",
    "field2": "value"
  }
}
```

**Error Responses:**

**400 Bad Request – Validation Error:**
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "data": {
    "errors": [
      { "field": "field1", "message": "[validation message]" }
    ]
  }
}
```

**400 Bad Request – [Specific Business Error]:**
```json
{
  "statusCode": 400,
  "message": "[Error message]",
  "data": { "field1": "value" }
}
```

**404 Not Found – [Resource] Not Found:**
```json
{
  "statusCode": 404,
  "message": "[Not found message]",
  "data": { "field1": "value" }
}
```

**500 Internal Server Error:**
```json
{
  "statusCode": 500,
  "message": "[Generic server error message]",
  "data": null
}
```

---

## 6. Frontend Integration Requirements

### 6.1 [Primary Flow] Flow

**On Page Load:**
1. [What to display / auto-populate]
2. [Any auto-focus or pre-fill logic]
3. [Initial UI state — which buttons are enabled/disabled]

**On [Primary Action] (e.g. Submit / Confirm):**
1. Run client-side validation
2. If validation fails:
   - Block submission
   - Show inline validation errors below each field
3. If validation passes:
   - Call `[METHOD] /api/v1/[resource]/[action]`
   - Show loading indicator on submit button
   - Disable submit button during API call

**On Successful Response (200 OK):**
1. Clear any error messages
2. Show snackbar: "[Success message from API or custom message]"
3. Navigate to [Next Screen]
4. [Any state to persist / clear]

### 6.2 [Secondary Flow] Flow *(if applicable)*

**On [Secondary Action] Click:**
1. [Pre-call steps]
2. Call `[METHOD] /api/v1/[resource]/[action]` with [required fields]
3. Show loading indicator; disable button during API call

**On Successful Response (200 OK):**
1. Show snackbar: "[Success message]"
2. [Reset / clear relevant input fields]
3. [Re-enable inputs / reset state]

---

## 7. Error Handling

### 7.1 Client-Side Validation Errors
- Display inline below the relevant field
- Show in red text
- Block form submission
- Error messages:
  - "[field] is required"
  - "[field] must be [constraint]"

### 7.2 API Errors (4xx / 5xx)

| Error | Display Method | Message | UI Action |
|-------|---------------|---------|-----------|
| Validation (400) | Inline (red text) | From `data.errors[].message` | Block submit |
| [Business error] (400) | Snackbar | "[message]" | [Stay / redirect / highlight element] |
| Not found (404) | Snackbar | "[message]" | Stay on screen |
| Network error | Snackbar | "Network error. Please check your connection and try again." | Preserve inputs for retry |
| Server error (500) | Snackbar | "An unexpected error occurred. Please try again later." | Stay on screen |

### 7.3 Error Display Summary

| Error Type | Display Method | Example Message |
|-----------|---------------|-----------------|
| Client validation | Inline (red text) | "[field] is required" |
| [API business error] | Inline or Snackbar | "[message]" |
| Not found | Snackbar | "[Not found message]" |
| Network error | Snackbar | "Network error. Please check your connection and try again." |
| Server error | Snackbar | "An unexpected error occurred. Please try again later." |

---

## 8. Navigation Rules

| Condition | Action |
|-----------|--------|
| Successful [primary action] | Navigate to [Next Screen] |
| [Business condition] | Navigate to [Alternate Screen] or [Stay] |
| Validation failure | Stay on same screen |
| API failure | Stay on same screen |
| [Specific error condition] | Stay on same screen, [highlight element / prompt action] |

---

## 9. State Management Rules

- [What to store after success — e.g., user details, token, IDs — and where (React state, context, store)]
- [What NOT to store — e.g., OTP values, sensitive tokens in localStorage]
- [What to clear on success / error]
- [Data passed from previous screen and how it is accessed — e.g., route params, context, state]

---

## 10. Security Requirements

- **Do NOT store [sensitive value]** in local storage, session storage, or any persistent storage
- **Do NOT log [sensitive value]** in console or any logging system
- **Do NOT expose [sensitive value]** in URL parameters or query strings
- Validate input format on client-side before API call
- [Other security constraints specific to this feature]

---

## 11. UX Recommendations

1. **Auto-focus** [primary input] on page load
2. **[Auto-submit / auto-advance]** when [condition] (optional)
3. **Paste support** for [input type] from clipboard (if applicable)
4. **Loading states** — disable interactive elements during API calls
5. **Clear visual feedback** for success / error states
6. **[Feature-specific UX note]** — [description]
7. **[Masked display]** — show [sensitive info] partially masked for security (if applicable)

---

## 12. Dependencies

### 12.1 Upstream Screens / Data
- **[Previous Screen]** — provides [field / token / ID] used on this screen
- [Any context, store, or route state this screen reads on mount]

### 12.2 Downstream Screens / Data
- **[Next Screen]** — receives [field / token / ID] from this screen's success response
- [Any context, store, or route state this screen writes on success]

### 12.3 API Dependencies
- `[METHOD] /api/v1/[resource]/[action]` — [purpose]
- `[METHOD] /api/v1/[resource]/[action]` — [purpose]

---

## 13. Open Items / TBD

1. **[Item 1]**: [Description of what needs to be decided — e.g. exact route path, component library choice]
2. **[Item 2]**: [Description]
3. **[Item 3]**: [Description]

---

## 14. Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | YYYY-MM-DD | Development Team | Initial version |

---

**Document Status**: [DRAFT | IN REVIEW | FINAL – READY FOR IMPLEMENTATION]
