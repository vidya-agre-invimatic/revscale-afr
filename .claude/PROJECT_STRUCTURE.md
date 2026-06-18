# PROJECT_STRUCTURE.md
# Version: 2.0 | Status: APPROVED
# Project: Sendlytics / Revscale Analytics Platform

---

## 1. File Extension Rules — CRITICAL

> Violating this causes TypeScript / Next.js parse errors and broken builds.

| File Contains JSX | Required Extension |
|-------------------|--------------------|
| YES               | `.tsx`             |
| NO                | `.ts`              |

**Examples**

✅ `OverviewPage.tsx`       — React component, returns JSX
✅ `campaignQuery.ts`       — React Query hooks, no JSX
✅ `SampleForm.tsx`         — Formik form component, returns JSX
✅ `uiSlice.ts`             — Redux slice, no JSX
✅ `usePermissions.ts`      — Custom hook, no JSX
❌ `auth.context.ts`        — WRONG if it returns JSX → parse error
❌ `role.guard.ts`          — WRONG if it returns JSX → parse error

**Rules:**
- All files under `src/` must be `.ts` or `.tsx` — no `.js` or `.jsx` anywhere.
- No CSS-in-JS — only Tailwind utility classes.

---

## 2. Folder Structure

```
src/
│
├── app/                            # Next.js App Router — pages and layouts
│   ├── layout.tsx                  # Root layout — wraps ReduxProvider + ReactQueryProvider
│   ├── page.tsx                    # Homepage / entry point
│   ├── globals.css                 # Tailwind directives + base styles only
│   └── (routes)/                   # Route groups per role or feature
│       ├── (super-admin)/
│       ├── (agency-admin)/
│       ├── (agency-manager)/
│       ├── (brand-admin)/
│       └── (agency-client)/
│
├── components/
│   └── ui/                         # Shared primitive UI components
│                                   # e.g. Button, Input, Modal, Badge, Table, Chart wrappers
│
├── features/                       # One folder per domain feature
│   └── <feature>/
│       ├── components/             # Feature-local UI components (.tsx)
│       ├── schemas/                # Yup validation schemas (.ts)
│       ├── types/                  # Feature-specific TypeScript types (.ts)
│       ├── <feature>Query.ts       # TanStack React Query hooks (useQuery / useMutation)
│       └── <feature>Slice.ts       # Redux slice — UI state ONLY (no server data)
│
├── hooks/                          # Global reusable hooks
│   ├── useDebounce.ts
│   └── usePermissions.ts           # Role / permission checks
│
├── providers/                      # React context and provider wrappers ('use client')
│   ├── ReduxProvider.tsx           # Wraps app with Redux <Provider>
│   └── ReactQueryProvider.tsx      # QueryClient setup + React Query Devtools (dev only)
│
├── store/                          # Redux store configuration
│   ├── store.ts                    # configureStore — imports all feature slice reducers
│   └── hooks.ts                    # Typed useAppDispatch / useAppSelector
│
├── styles/
│   └── colors.ts                   # Design token reference (agency theme colours)
│
├── types/
│   └── index.ts                    # Shared TypeScript interfaces and types
│
├── utils/
│   └── index.ts                    # Pure utility functions: formatDate (moment), classNames, etc.
│
└── constants/
    └── index.ts                    # ROLES as const, QUERY_KEYS, DATE_FORMATS, etc.
```

### Feature Folder Example — `features/campaigns/`

```
features/campaigns/
├── components/
│   ├── CampaignTable.tsx
│   ├── CampaignTagChart.tsx
│   └── CampaignTrendChart.tsx
├── schemas/
│   └── campaign.schema.ts
├── types/
│   └── campaign.types.ts
├── campaignQuery.ts                # useQuery / useMutation hooks (no direct fetch/axios)
└── campaignSlice.ts                # UI state: selected tags, sort column, pagination, etc.
```

---

## 3. State Management Rules

| Concern | Tool | Rule |
|---|---|---|
| UI state (modals, filters, sort, loading flags) | Redux Toolkit | Live in a feature slice |
| Server / fetched data | React Query | Never store in Redux |
| Derived / computed values | `useMemo` / selectors | Computed, not stored |

- **Do not** put server response data into Redux.
- **Do not** call `fetch` or `axios` directly — all data flows through React Query `queryFn`.
- Always use the typed hooks: `useAppDispatch()` and `useAppSelector()` from `@/store/hooks`.
- Each feature slice may only own UI state relevant to that feature.

---

## 4. Routing & Access Control Rules

- Route protection is enforced **server-side on every request** — not just by hiding UI elements.
- Every route and every query must be scoped to the authenticated user's agency (multi-tenancy enforced at query level).
- Unauthenticated request → redirect to `/login`.
- Authorised but wrong role → redirect to `/unauthorized`.
- Agency Client unlinked from any client → auto-removed, logged out.

---

## 5. Import Alias

All internal imports use the `@/*` alias pointing to `src/`:

```ts
// Correct
import { useAppDispatch } from '@/store/hooks';
import SampleForm from '@/components/SampleForm';
import { QUERY_KEYS } from '@/constants';

// Wrong — relative paths banned for cross-folder imports
import { useAppDispatch } from '../../../store/hooks';
```

---

## 6. Code Quality Rules

- **TypeScript strict mode** is on — zero type errors permitted.
- `npm run build` must pass with zero errors and zero warnings before any merge.
- ESLint config: `next/core-web-vitals` + `@typescript-eslint` rules (see `.eslintrc.json`).
- Pre-commit hook (Husky) runs `lint-staged` (ESLint --fix on staged `.ts`/`.tsx`) then `tsc --noEmit`.
- No `// @ts-ignore` or `any` without an explicit comment justifying the exception.
- No commented-out code committed to the repo.
