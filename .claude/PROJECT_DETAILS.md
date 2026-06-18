# Sendlytics / Revscale Analytics Platform – Project Details
**Version:** 1.0 | **Date:** 11 June 2026 | **Status:** Draft
> Internal codename: Revscale. Public-facing name: Sendlytics.

---

## 1. What Sendlytics Is

### 1.1 In Plain Terms

Sendlytics is an online dashboard built for digital marketing agencies. These agencies run email and SMS marketing campaigns on behalf of many different clients inside a tool called **Klaviyo**. Each client's data lives in its own separate Klaviyo account, so an agency managing twenty clients has to log in and out of twenty different places.

Sendlytics pulls all of that scattered information into one place — campaign results, automated flow performance, email deliverability, revenue figures, and audience insights — and presents them on a single shared dashboard. An agency can compare clients side by side, spot trends early, and hand clean, consistent reports to the businesses they work for.

Because several agencies use the same platform at once, Sendlytics is **multi-tenant** — every agency's data is walled off from every other agency's.

### 1.2 Why It Needs to Exist

Agencies today waste time stitching reports together by hand. Data is fragmented across separate Klaviyo workspaces, there is no easy way to compare one client against another, and producing a monthly report for each client is slow and repetitive. Sendlytics removes that friction by aggregating and visualising everything automatically.

### 1.3 Core Goals

1. Give each agency a unified view of every client's Klaviyo performance.
2. Let users drill from the big picture down to individual campaigns, flows, segments, and products.
3. Keep every agency's data completely separate — zero cross-agency leakage.
4. Show each person only what their role permits (RBAC).
5. Connect to Klaviyo and Shopify through secure, permission-based OAuth flows.
6. Let each agency apply their own branding — colours, logo, benchmark targets.

### 1.4 In Scope — This Release

- Google and Microsoft SSO login
- Agency and client management with multi-tenant separation
- Full analytics suite (Overview, Campaigns, Flows, Deliverability, Benchmarks, Segments, Segment Growth, Trends, Product Insights, Product Overviews, RFM Segments, Subject Line Analysis, Insights, Agency Breakdown)
- Klaviyo and Shopify integrations
- Theme, team, and benchmark Settings
- Per-user preference persistence (date range, grouping, comparison period)

### 1.5 Out of Scope — This Release

- Traditional email/password login (Google + Microsoft SSO only)
- Creating or editing campaigns within Sendlytics — read-only data platform
- Native mobile app
- Multiple Klaviyo accounts per client (planned for future release)

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router), React 18 |
| Language | TypeScript — strict mode; zero build errors required |
| Data Fetching | @tanstack/react-query v5 — no REST wrappers, no Axios |
| Forms | Formik + Yup |
| State Management | Redux Toolkit + react-redux |
| Styling | Tailwind CSS — no CSS-in-JS |
| Charts | recharts |
| Utilities | moment |
| Authentication | Google OAuth + Microsoft OAuth, secured with JWT tokens |
| Integrations | Klaviyo, Shopify |
| Code Quality | ESLint (`next/core-web-vitals`), Husky, lint-staged |
| CI/CD | GitHub Actions — separate test and production pipelines |
| Hosting | Docker containers on Fly.io |

> **Disallowed:** react-hook-form, final-form, joi, mobx, zustand, recoil, swr, RTK Query, superagent, Ant Design, Chakra UI, MUI, emotion.

---

## 3. User Roles

Five roles govern access. Roles are assigned by Agency Admins and Super Admins in Settings.

| Role | What they do | What they can reach | Landing page after login |
|---|---|---|---|
| **Super Admin** | Runs the whole platform | Everything | Clients list of their assigned agency |
| **Agency Admin** | Runs one agency | Everything within their agency | First client overview |
| **Agency Manager** | Handles assigned clients | Only their assigned clients | First assigned client overview |
| **Brand Admin** | Owns one brand | Their brand client only | Brand overview (or Settings if no client linked) |
| **Agency Client** | Views their own data | Their single dashboard, read-only | Their linked client overview |

### Role-Specific Rules

- **Super Admin** is the only role that sees "Add New Agency". Can copy a client between agencies and delete anything. Does **not** see agency-specific Team settings.
- **Agency Admin** can invite new teammates as Agency Managers or Agency Clients. Full control inside their own agency.
- **Agency Manager** cannot access team settings, agency settings, or any unassigned client.
- **Brand Admin** is created during Sendlytics Pro / Shopify onboarding. On login → brand client overview, or Settings if no client linked yet.
- **Agency Client** gets read-only access to one dashboard. If their account becomes unlinked from any client, the system **auto-removes them and logs them out**.

---

## 4. User Journeys

### 4.1 Login & Routing

1. User visits login page → chooses Sign in with Google or Sign in with Microsoft.
2. Redirected to OAuth provider, returns with a secure token.
3. System validates token and looks up the user:
   - No matching user → error, back to login.
   - User exists but no agency → error message shown.
   - User valid → session logged (user ID + UTC timestamp), preferences restored, routed to correct landing page.
4. Agency Client with no linked client → auto-removed, logged out.
5. Login failure snackbar → appears, auto-dismisses after 4 seconds.

### 4.2 Navigating Analytics Screens

Once on a client overview, a navigation menu provides access to all analytics modules (see Section 5). Each screen answers a different question about the client's marketing performance.

### 4.3 Connecting a Klaviyo Account

Only Agency Admin or Super Admin can connect a data source:
1. Open a client from the clients page.
2. Fill in Klaviyo settings: API key, conversion metric, history depth (backfill days), list inclusions/exclusions.
3. Save → Sendlytics begins pulling data from Klaviyo.
4. Revoke → stored token cleared, integration disabled, analytics stop updating until re-authorised.

> API key is stored server-side, encrypted. It is **never sent to the browser**.

---

## 5. Analytics Modules

| Screen | What it answers |
|---|---|
| **Overview** | Headline metrics: attributed revenue, orders, campaign/flow conversions, total email orders. Revenue chart, campaign section, flow section, subject-line panel. |
| **Campaigns** | Sortable/filterable table (50-row pagination), tag groupings, tag chart, trend chart, summary card. |
| **Flows** | All active automated sequences with step-level drill-down. Multi-flow comparison via multi-select. Empty state shows illustration, never blank charts. |
| **Deliverability** | Horizontal bar chart: delivery, bounce, spam, and unsubscribe rates. Respects selected date range. |
| **Benchmarks** | Combo chart: client actuals vs agency-configured target values. |
| **Segments** | Klaviyo audience groups. Selector remembers choice. Breakdown table + campaigns that reached the segment. |
| **Segment Growth** | How segment size changes over time. |
| **Trends** | Attributed revenue over time; campaign vs flow revenue side by side; email-channel revenue; total all-channel revenue. |
| **Product Insights** | Performance broken down by product. |
| **Product Overviews** | High-level product summary. |
| **RFM Segments** | Customers grouped by Recency, Frequency, Monetary value. User enters thresholds; server calculates groups (Champions, At Risk, Lost, etc.) with count and AOV. |
| **Subject Line Analysis** | What wording performs best. |
| **Insights** | Deeper retention and engagement analysis. |
| **Agency Breakdown** | Cross-client performance comparison for the whole agency. |
| **Settings** | Theme colours, team members, benchmark values, logo. Super Admin: add new agency. |

---

## 6. Functional Requirements

### FR-01 — Authentication

| # | Rule |
|---|---|
| FR-01.1 | Google SSO login must work. |
| FR-01.2 | Microsoft SSO login must work. Both providers must function simultaneously. |
| FR-01.3 | After successful login, route user to the correct landing page for their role. If no agency exists, show error. |
| FR-01.4 | Record every successful login: user ID + UTC timestamp. Logging failure must **not** block login. |
| FR-01.5 | Restore saved preferences (date range, grouping, comparison) via redirect params. Missing/invalid values default to sensible values (`period = "month"`). |
| FR-01.6 | Login failure shows a snackbar notification explaining the reason; auto-dismisses after 4 seconds. |

### FR-02 — Client Management

| # | Rule |
|---|---|
| FR-02.1 | Searchable, sortable client list. Agency Managers and Agency Clients only see assigned clients. |
| FR-02.2 | Add client: name (unique within agency), timezone, currency. |
| FR-02.3 | Edit client: Agency Admin, Super Admin, Brand Admin only. |
| FR-02.4 | Delete client: confirmation required. Permanently removes all client data. |
| FR-02.5 | Copy client (Super Admin only): duplicates config; new client starts with empty analytics. |
| FR-02.6 | Klaviyo connection: API key, conversion metric, backfill days, list inclusions/exclusions. Key stored server-side only — never exposed to browser. |
| FR-02.7 | Revoke Klaviyo connection: clears token, stops analytics updates, prompts re-authorisation. |
| FR-02.8 | Real-time client list filter by name — case-insensitive, instant. |

### FR-03 — Client Overview Dashboard

| # | Rule |
|---|---|
| FR-03.1 | Date range selector; default = last 30 days. Persisted per user. |
| FR-03.2 | Grouping: day / week / month; default = month. Persisted. |
| FR-03.3 | Comparison period: prior period, prior year, etc. Persisted. |
| FR-03.4 | Summary cards: attributed revenue, orders, campaign conversions, flow conversions, total email orders. Each shows ±% vs comparison period. Currency formatted per client. |
| FR-03.5 | Revenue chart: attributed vs unattributed stacked over time. |
| FR-03.6 | Campaign section with summary + link to Campaigns module. |
| FR-03.7 | Flow section with summary + link to Flows module. |
| FR-03.8 | Subject-line panel: top-performing subject lines. |

### FR-04 — Campaigns

| # | Rule |
|---|---|
| FR-04.1 | Sortable, filterable table: send date, open/click rates, revenue, orders. Paginates at 50 rows. |
| FR-04.2 | Group campaigns by Klaviyo tags. |
| FR-04.3 | Tag chart across configurable metrics. |
| FR-04.4 | Trend chart: campaign volume and revenue over time. |
| FR-04.5 | Summary card: total campaign revenue for selected period. |

### FR-05 — Flows

| # | Rule |
|---|---|
| FR-05.1 | List of all active flows with performance metrics. |
| FR-05.2 | Step-level drill-down within any flow. Multi-select for side-by-side flow comparison. |
| FR-05.3 | Detail dialog with richer metrics on demand. |
| FR-05.4 | Empty state: illustration + message — never blank charts. |

### FR-06 — Deliverability

| # | Rule |
|---|---|
| FR-06.1 | Horizontal bar chart: delivery, bounce, spam, unsubscribe rates. |
| FR-06.2 | Respects the dashboard date range. |

### FR-07 — Benchmarks

| # | Rule |
|---|---|
| FR-07.1 | Combo chart: client actuals vs target values. |
| FR-07.2 | Agency Admin sets default benchmark values per metric; applied to all clients unless overridden. |

### FR-08 — Segments

| # | Rule |
|---|---|
| FR-08.1 | Segment selector remembers last choice per user. |
| FR-08.2 | Breakdown table: subscriber counts and growth. |
| FR-08.3 | List of campaigns that reached the selected segment; filterable by date. |

### FR-09 — Trends

| # | Rule |
|---|---|
| FR-09.1 | Total attributed revenue over time. |
| FR-09.2 | Campaign revenue vs flow revenue side by side. |
| FR-09.3 | Email-channel revenue on its own chart. |
| FR-09.4 | Total revenue across all channels combined. |

### FR-10 — RFM Segments

| # | Rule |
|---|---|
| FR-10.1 | User enters thresholds for Recency, Frequency, Monetary value. All required, numeric, positive. |
| FR-10.2 | Server calculates segments (Champions, At Risk, Lost, etc.) and returns count + average order value per group. |

### FR-11 — Settings

| # | Rule |
|---|---|
| FR-11.1 | Theme: choose chart and background colours. Applied across all agency charts. |
| FR-11.2 | Team management: add/edit/remove members (unique email addresses); deletion requires confirmation. Roles: Agency Manager or Agency Client. |
| FR-11.3 | Logo upload to replace default Sendlytics branding. |
| FR-11.4 | Super Admin: add new agency (name must be globally unique). |
| FR-11.5 | When adding a Brand Admin: debounced server-side email uniqueness check. |

### FR-12 — Preference Persistence

| # | Rule |
|---|---|
| FR-12.1 | Save date range, grouping, and comparison setting whenever user changes them. |
| FR-12.2 | Restore saved preferences at next login. Fall back to defaults if missing or invalid. |

---

## 7. Non-Functional Requirements

| ID | Quality | Requirement |
|---|---|---|
| NFR-01 | Speed | Every chart screen loads within 3 seconds on standard broadband |
| NFR-02 | Login security | Every request carries a valid JWT; invalid/expired tokens reject the request and force re-login |
| NFR-03 | Access control | Server-side permission checks on every request — not just hidden UI elements |
| NFR-04 | Multi-tenancy | Every query is scoped by agency; database-level row security enforced; no cross-agency data |
| NFR-05 | Reliability | Docker on Fly.io; separate test and production environments; zero-downtime deploys via GitHub Actions |
| NFR-06 | Usability | Responsive and usable at ≥ 1280px desktop; no horizontal scroll; touch-friendly controls on tablets |
| NFR-07 | Persistence | Date range, grouping, comparison settings survive sessions and are restored on next login |
| NFR-08 | OAuth consent | Klaviyo and Shopify require explicit user consent before data access; revoking clears all stored tokens |
| NFR-09 | Maintainability | Strict TypeScript throughout; zero compile errors required on every build |
| NFR-10 | Auditability | Every login recorded (user ID + UTC timestamp); records visible to Super Admins |

---

## 8. Risk Register

| ID | Risk | Impact | Likelihood | Mitigation |
|---|---|---|---|---|
| R-01 | Klaviyo API keys exposed to browser | High | Medium | Encrypt at rest; server-side only; never in any browser payload |
| R-02 | Misconfigured role gives wrong access | High | Medium | Server-side checks on every request; regular role assignment audits |
| R-03 | Agency Client accidentally auto-deleted | Medium | Low | Confirmation or soft-delete step; Super Admin restore grace period; deletion logged |
| R-04 | Only one Klaviyo account per client | Medium | Medium | Clearly documented limitation; data model designed for multi-account in future release |
| R-05 | Google or Microsoft login outage | High | Low | Monitor provider status; document emergency Super Admin access path; consider backup auth |
| R-06 | Data leakage between agencies | **Critical** | Low | Agency-scoped on every query; DB-level row security; regular security audits |
| R-07 | Revoked Klaviyo/Shopify token not handled | Medium | Medium | Listen for revocation events; clear tokens immediately; prompt user to reconnect |
| R-08 | No caching — live data dependency | Medium | Medium | Cache with background refresh; loading skeletons; graceful error/empty states |

### Risk Theme Summary

| Theme | Count | Most Severe |
|---|---|---|
| Security (keys, access control, tenancy) | 3 | Critical |
| Integrations (Klaviyo, Shopify) | 2 | Medium |
| Authentication (login dependency) | 1 | High |
| Data management (deletion, caching) | 2 | Medium |

---

## 9. Glossary

| Term | Meaning |
|---|---|
| **Klaviyo** | The email and SMS marketing tool Sendlytics reads data from |
| **Shopify** | Online store platform; Sendlytics links it to connect marketing results with actual sales |
| **JWT** | A secure digital pass issued after login to confirm identity on every request |
| **RFM** | Recency, Frequency, Monetary value — a way to group customers by purchasing behaviour |
| **Attributed revenue** | Sales traceable directly to a specific email campaign or flow |
| **Unattributed revenue** | Sales in the same time window that cannot be tied to a specific email |
| **Flow** | An automatic email or SMS sequence triggered by behaviour (e.g. abandoned-cart reminder) |
| **Segment** | A group of subscribers in Klaviyo sharing certain characteristics |
| **Backfill days** | How many days of past data to import when a client is first connected |
| **Multi-tenant** | One shared platform keeping every agency's data fully separated from the others |
| **RBAC** | Role-Based Access Control — restricting what each person can see or do based on their assigned role |
| **Agency Client** | The agency's own end-customer; gets read-only access to their single dashboard |
| **Brand Admin** | Created during Sendlytics Pro / Shopify onboarding; manages their own brand client |
| **Revscale** | Internal codename for the Sendlytics platform |
