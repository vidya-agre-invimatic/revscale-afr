# /test — Playwright E2E Test Generator & Runner

Generates and/or runs Playwright E2E tests derived from an AFR `.md` file.

---

## Usage

| Command | What it does |
|---|---|
| `/test <afr-file>` | Parses AFR, generates Playwright spec files |
| `/test run` | Runs all generated specs against dev server + real backend |
| `/test <afr-file> run` | Generates specs AND runs them in one shot |

---

## Step 0 — Detect Mode

Parse `$ARGUMENTS` to determine mode:

- Contains a `.md` file path → **generate mode** (Steps 1–5)
- Contains only `run` → **run mode** (Step 6 only)
- Contains both a `.md` file path and `run` → **generate + run mode** (Steps 1–6)
- Empty → stop and output:

> **Error: No arguments provided.**
>
> Usage:
> - `/test <path-to-afr-file.md>` — generate tests from AFR
> - `/test run` — run all generated tests
> - `/test <path-to-afr-file.md> run` — generate and run
>
> Example: `/test .claude/specs/step1-credai-form.md`

---

## Step 1 — Verify Prerequisites (Generate Mode)

Before parsing the AFR, check that the Playwright infrastructure exists. If any of the following are missing, create them (Step 2) before proceeding:

- `playwright.config.ts` at project root
- `tests/global-setup.ts`
- `tests/fixtures/sample.pdf` (tiny valid PDF)
- `tests/fixtures/sample.jpg` (tiny valid JPG)
- `tests/fixtures/large.pdf` (file > 500 KB to trigger size errors)
- `tests/fixtures/large-image.jpg` (file > 2 MB to trigger image size errors)

Also verify `@playwright/test` is in `package.json` devDependencies. If not, output:

> **Action required:** Run `npm install -D @playwright/test` then re-run this command.

Stop until the user confirms installation.

---

## Step 2 — Create Playwright Infrastructure (first run only)

If `playwright.config.ts` does not exist, create it:

```ts
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',
  globalSetup: './tests/global-setup.ts',
  use: {
    baseURL: process.env.VITE_BASE_URL ?? 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
})
```

If `tests/global-setup.ts` does not exist, create it:

```ts
// tests/global-setup.ts
import { request } from '@playwright/test'
import fs from 'fs'
import path from 'path'

const API_BASE = process.env.VITE_API_BASE_URL ?? 'http://localhost:5000'
const TEST_EMAIL = 'playwright@credai.test'
const AUTH_FILE = path.join(__dirname, 'auth.json')

export default async function globalSetup() {
  // 1. Cleanup test data from previous runs
  const cleanupCtx = await request.newContext()
  await cleanupCtx.delete(`${API_BASE}/test/cleanup`)
  await cleanupCtx.dispose()

  // 2. Get test JWT (requires ENABLE_TEST_AUTH=true on backend)
  const authCtx = await request.newContext()
  const res = await authCtx.post(`${API_BASE}/auth/test-token`, {
    data: { email: TEST_EMAIL },
  })

  if (!res.ok()) {
    throw new Error(
      `[global-setup] POST /auth/test-token failed: ${res.status()}\n` +
      'Ensure the backend is running with ENABLE_TEST_AUTH=true'
    )
  }

  const { token, applicantId } = await res.json()

  // 3. Save auth state for all tests to reuse
  fs.writeFileSync(AUTH_FILE, JSON.stringify({ token, applicantId, email: TEST_EMAIL }))
  await authCtx.dispose()
}
```

Create fixture files (tiny binary stubs — 1 byte each named correctly; the test suite replaces them with real files when needed):

- `tests/fixtures/sample.pdf`
- `tests/fixtures/sample.jpg`
- `tests/fixtures/large.pdf` — must be > 500 KB (pad with null bytes)
- `tests/fixtures/large-image.jpg` — must be > 2 MB

Create a shared test helper:

```ts
// tests/helpers/auth.ts
import { Page } from '@playwright/test'
import fs from 'fs'
import path from 'path'

export async function injectAuth(page: Page) {
  const { token, applicantId, email } = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../auth.json'), 'utf-8')
  )
  // Inject JWT into Redux store via localStorage key the app reads on init
  await page.addInitScript(({ token, applicantId, email }) => {
    // Use the same storage key your Redux auth slice reads on startup
    sessionStorage.setItem('credai_auth', JSON.stringify({ token, applicantId, email }))
  }, { token, applicantId, email })
}
```

> **Note to implementor:** Check `src/store/index.ts` and the auth slice to confirm the exact sessionStorage/cookie key used — update `injectAuth` to match exactly.

---

## Step 3 — Parse the AFR Document

Read the provided AFR `.md` file in full. Extract and organize into these buckets:

### Bucket A — Field Validation Tests
From Section 4 (Fields, Validation & Error Messages):
- For each field: field name, type, required/optional, validation rules, exact error message strings
- Note which fields are conditional (membership type, firm type)
- Note file upload fields: allowed formats, max size, limit

### Bucket B — Conditional Logic Tests
From Section 5 (Conditional Logic):
- Membership type branches: which steps/fields appear or are hidden per type
- Firm type branches: which documents appear per firm type
- Step routing rules: which step follows which for each membership type

### Bucket C — Error Case Tests
From Section 10 (Key Error Cases & Behaviors):
- Each numbered row becomes one test
- Note whether the behavior is blocking or non-blocking (warning only)

### Bucket D — Happy Path Flows
From Section 3 (Application Flow):
- One happy path per membership type: Ordinary, Associate, RERA
- Each traces the full step sequence for that type
- Uses `[TEST]` prefix on firm name for cleanup identification

### Bucket E — Step Metadata
- Step number, name, API endpoint (from Section 7)
- Which membership types this step applies to

---

## Step 4 — Generate Spec Files

Generate one spec file per step, plus dedicated files for error cases and happy paths.

### File naming and placement

```
tests/
├── e2e/
│   ├── step1-credai-form.spec.ts
│   ├── step2-address-tax.spec.ts
│   ├── step3-firm-details.spec.ts
│   ├── step4-contact-person.spec.ts
│   ├── step5-completed-projects.spec.ts
│   ├── step6a-commencement.spec.ts
│   ├── step6b-rera.spec.ts
│   ├── step7-associates.spec.ts
│   ├── step8-proposer-seconder.spec.ts
│   ├── step9-code-of-conduct.spec.ts
│   ├── step10-self-declaration.spec.ts
│   ├── step11-additional-docs.spec.ts
│   ├── step12-review-submit.spec.ts
│   ├── error-cases.spec.ts
│   └── happy-path.spec.ts
```

Only generate spec files for steps present in the AFR being processed — do not generate stubs for steps not covered.

### Spec file structure (apply to every step spec)

```ts
import { test, expect } from '@playwright/test'
import { injectAuth } from '../helpers/auth'
import path from 'path'

const FIXTURES = path.join(__dirname, '../fixtures')

test.describe('Step N — {Step Name}', () => {
  test.beforeEach(async ({ page }) => {
    await injectAuth(page)
    await page.goto('/applicant/application/{stepRoute}')
  })

  // --- Field Validation Tests (Bucket A) ---
  test.describe('Field Validation', () => {
    // One test per required field — submit empty, assert error message
    // One test per regex rule — submit invalid value, assert error message
    // One test per max length — submit oversized value, assert error message
    // One test per file constraint — upload wrong type/size, assert error message
  })

  // --- Conditional Logic Tests (Bucket B) ---
  test.describe('Conditional Logic', () => {
    // One test per branch: select membership type / firm type, assert field appears or is hidden
    // One test per step routing rule: assert correct next step navigation
  })
})
```

### Error cases spec structure

```ts
// tests/e2e/error-cases.spec.ts
import { test, expect } from '@playwright/test'
import { injectAuth } from '../helpers/auth'

test.describe('Error Cases — Section 10', () => {
  // One test per numbered row in Section 10 of the AFR
  // Test name must include the error case number: 'EC-01 — Duplicate firm name...'
  // Non-blocking warnings: assert warning appears AND that Next/Submit still works
  // Blocking errors: assert Next/Submit is disabled or shows blocking message
})
```

### Happy path spec structure

```ts
// tests/e2e/happy-path.spec.ts
import { test, expect } from '@playwright/test'
import { injectAuth } from '../helpers/auth'
import path from 'path'

const FIXTURES = path.join(__dirname, '../fixtures')

test.describe('Happy Path', () => {
  test('Ordinary membership — full application submission', async ({ page }) => {
    await injectAuth(page)
    // Step 1 → 2 → 3 → 4 → 5 → 6A → 7 → 8 → 9 → 10 → 11 → 12 → Submit
    // Firm name: '[TEST] Playwright Ordinary Firm'
    // Assert final status: PaymentPending
  })

  test('Associate membership — full application submission', async ({ page }) => {
    await injectAuth(page)
    // Step 1 → 2 → 3 → 4 → 6A → 7 → 8 → 9 → 10 → 11 → 12 → Submit
    // Firm name: '[TEST] Playwright Associate Firm'
  })

  test('RERA membership — full application submission', async ({ page }) => {
    await injectAuth(page)
    // Step 1 → 2 → 3 → 4 → 6B → 7 → 9 → 10 → 11 → 12 → Submit
    // Firm name: '[TEST] Playwright RERA Firm'
  })
})
```

### Rules for generated test content

- Every error message string in a `toContainText()` assertion must match the AFR verbatim — copy exactly, do not paraphrase
- File upload tests use `page.setInputFiles()` with fixture paths
- Conditional field visibility uses `toBeVisible()` / `toBeHidden()`
- Blocking validation uses `toBeDisabled()` on the Next/Submit button OR checks the error message appears and button remains non-functional
- Non-blocking warnings use `toContainText()` on a warning element but do NOT assert the button is disabled
- All test data strings use the `[TEST]` prefix on firm names for cleanup identification
- Never hardcode the base URL — always use relative paths (`/applicant/...`)

---

## Step 5 — Self-Review Before Writing

Before writing any file:

- [ ] All error message strings copied verbatim from AFR — not paraphrased
- [ ] Conditional tests cover every branch in Section 5 of the AFR
- [ ] Error case tests cover every row in Section 10 of the AFR
- [ ] Happy path tests cover all 3 membership types
- [ ] All firm names in tests use `[TEST]` prefix
- [ ] `injectAuth` is called in every `beforeEach`
- [ ] File upload tests reference `FIXTURES` path constant — no hardcoded paths
- [ ] No mock API calls — all tests hit the real backend
- [ ] Spec files placed in `tests/e2e/` — not in `src/`
- [ ] File names are kebab-case with `.spec.ts` extension

---

## Step 6 — Run Mode

When mode includes `run`:

1. Check that `tests/auth.json` exists (global setup has run). If not:
   > Run `/test` in generate mode first, then ensure the backend is running with `ENABLE_TEST_AUTH=true` before running tests.

2. Output the exact commands the user should run:

```bash
# Terminal 1 — start the frontend dev server
npm run dev

# Terminal 2 — run Playwright tests
npx playwright test

# To run a single spec:
npx playwright test tests/e2e/step1-credai-form.spec.ts

# To view the HTML report after a run:
npx playwright show-report
```

3. Note: Playwright cannot start the dev server automatically in this setup since the backend also needs to be running manually. Instruct the user to start both servers before running tests.

4. If `run` was triggered as part of generate + run mode, output the above instructions after generating — do not attempt to execute `npx playwright test` directly.

---

## Step 7 — Output Completion Message (MANDATORY — DO NOT SKIP)

> **CRITICAL:** Skipping this step is a failure. Write/Edit tool calls alone are NOT sufficient output. The user cannot see tool calls — they only see assistant message text.

After all Write/Edit tool calls complete, output this block as plain assistant message text:

---

**Tests generated successfully.**

- **AFR:** `{AFR filename used}`
- **Spec files created:** {count}
  - `{file path 1}`
  - `{file path 2}`
  - *(continue for each)*
- **Infrastructure files created:** {list playwright.config.ts, global-setup.ts, helpers/auth.ts if newly created}
- **Test counts:**
  - Field validation tests: {count}
  - Conditional logic tests: {count}
  - Error case tests: {count} (from Section 10)
  - Happy path flows: {count}
- **Next steps:**
  1. Ensure backend is running with `ENABLE_TEST_AUTH=true`
  2. Run `npm run dev` to start the frontend
  3. Run `npx playwright test` to execute all tests
  4. Run `npx playwright show-report` to view results

---

Do not end your response without this block appearing as visible text to the user.
