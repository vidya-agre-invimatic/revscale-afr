# CREDAI AFR Frontend — Coding Standards

> For the complete folder layout and `.ts` / `.tsx` extension rules, see [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md).

---

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Files | kebab-case | `application-form.tsx` |
| Components | PascalCase | `ApplicationForm` |
| Hooks | `useXyz.ts` | `usePermissions.ts` |
| Types / DTOs | `*.types.ts` | `application.types.ts` |
| Schemas | `*.schema.ts` | `application.schema.ts` |
| API hooks | `*.api.ts` | `applicantApi.ts` |
| Services | `*.service.ts` | `upload.service.ts` |
| Constants | `SCREAMING_SNAKE` | `ROLES.APPLICANT` |

---

## Tech Stack (Allowed Libraries Only)

| Concern | Library |
|---------|---------|
| State (UI / client) | Redux Toolkit |
| Server state / API | TanStack Query (`@tanstack/react-query`) |
| Forms | Formik + Yup |
| HTTP | Axios (via `src/services/api.ts`) |
| Styling | Tailwind CSS |
| Routing | React Router v7 |

**Disallowed:** RTK Query · MUI · Chakra UI · Ant Design · emotion · react-hook-form · SWR · zustand · mobx

---

## Routing Rules

- Auth routes (`/login`) must be **inaccessible to logged-in users** — redirect to role home.
- Protected routes wrap with `<ProtectedRoute />`.
- Role-restricted routes wrap with `<RoleRoute allowedRoles={[ROLES.X]} />`.
- All page components must be **lazy-loaded** via `React.lazy`.
- Route paths follow kebab-case: `/applicant/application-new`, `/director-general/mcm-schedule`.

---

## Forms & Validation

- Use **Formik** for all forms; define schemas in `*.schema.ts` with **Yup**.
- Every field must have: label · input · validation error message.
- Submit button must be a **loading button** — disabled while submitting.
- Multi-step forms: validate only the **current step's schema** on Next; run full schema on final submit.
- Show a **form-level error** on API failure.
- Auto-save (blur + 30 s interval) must use `useMutation` with silent failure handling.

---

## State Management

- **Redux Toolkit** — UI state, auth tokens, role, session.
- **TanStack Query** — all server state (fetching, mutations, cache invalidation).
- No API calls inside components. API hooks live in `*.api.ts`.
- Derive UI state from query results where possible; avoid duplicating server state in Redux.

---

## API Layer

- All requests go through the shared Axios instance in `src/services/api.ts`.
- API hooks are custom hooks built on `useQuery` / `useMutation` exported from `*.api.ts`.
- Typed generics required: `useQuery<ResponseType>`, `useMutation<Response, Error, Payload>`.
- Handle 401 globally (redirect to `/login`); show user-facing message for 400/500.
- File uploads use `FormData`; set `Content-Type: multipart/form-data` only when needed.

---

## UI & Code Rules

1. Styling via **Tailwind CSS utility classes** only. No raw `style` props or plain global CSS.
2. Use CREDAI design tokens from `tailwind.config.js`:
   - Colors: `primary-*`, `secondary-*`, `gray-*`, `green-*`, `red-*`, `yellow-*`, `blue-*`
   - Typography: `text-heading-*`, `text-body-p*`, `text-cta-*`
3. No business logic inside page or layout components.
4. Functions ≤ 100 lines; single responsibility per file.
5. All API responses must be fully typed — no `any`.
6. Backend and frontend field names must match exactly.
7. No comments explaining *what* the code does — only *why* when non-obvious.

---

## Security

- Sanitize all text inputs; auto-uppercase fields as specified in BRD (GST, PAN, ROC, etc.).
- Validate file type (MIME) and size **client-side** before upload; backend re-validates.
- Never store sensitive data (JWT, OTP) in `localStorage` — use memory / `httpOnly` cookies.
- No `dangerouslySetInnerHTML`.

---

## Summary

| Concern | Standard |
|---------|----------|
| Global state | Redux Toolkit |
| Server state | TanStack Query |
| Forms | Formik + Yup |
| Auth guard | ProtectedRoute + RoleRoute |
| Styling | Tailwind CSS (CREDAI tokens) |
| API calls | Hooks in `*.api.ts` — never in components |
| Lazy loading | All pages via `React.lazy` |
