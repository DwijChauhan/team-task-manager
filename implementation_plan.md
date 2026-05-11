# Goal Description

Redesign the frontend of the Team Task Manager (TTM) web application to achieve a clean, professional, and minimal aesthetic inspired by Linear and Vercel. 

## User Review Required

> [!WARNING]
> **CRITICAL BLOCKER: Missing Authentication & Database**
> Your prompt states: *"This is a real Next.js app with JWT authentication, Postgres, and real Admin/Member roles — do not mock any auth or role logic. Read the user's role from the existing JWT session/token."*
> 
> However, I have audited the codebase and **there is no JWT authentication or Postgres database implemented**. The `package.json` does not contain any database or auth dependencies (like `pg`, `prisma`, `jsonwebtoken`, `next-auth`), and the current `app/page.tsx` simply has `// Simulate successful login` using React state.
> 
> **How would you like to proceed?**
> 1. Should I mock the JWT/Role logic for this UI redesign?
> 2. Or do you want me to set up a real Postgres + JWT backend first before proceeding with the frontend redesign?

## Open Questions

- What library/approach should be used to parse the "existing JWT session" once we clarify the blocker above? (e.g., `jsonwebtoken`, cookies, etc.)

## Proposed Changes

> [!NOTE]
> I have created the new git branch: `redesign/professional-ui`.

### STEP 1 — globals.css

#### [MODIFY] app/globals.css
- Audit all existing `@theme` variables.
- Replace the theme block with the exact flat minimal palette provided (`--color-bg-page`, `--color-bg-card`, etc.).
- Add global rules for `transition` on interactive elements, `cursor: pointer` on clickable elements, custom scrollbars, and restrict font weights to 400 and 500 only.

### STEP 2 — Login / Signup page

#### [MODIFY] app/page.tsx
- Vertically center the login card.
- Fix the Login/Signup tab switcher styling.
- Add Role selector dropdown (Admin / Member) to the Signup form and wire it to the signup logic.
- Add inline validation with red helper text + `ti-alert-circle`.
- Add the micro-copy: "Secure JWT session · Role-based access".
- Update feature badges to be 12px, border-radius 20px, 0.5px border, no background, muted text.

### STEP 3 — Dashboard layout / Sidebar

#### [MODIFY] app/(dashboard)/layout.tsx
- Update the User block at the top with a 36px diameter initials circle and specific typography.
- Add the role badge (Admin/Member) next to the user's name reading from the JWT session (pending resolution of the blocker above).
- Add the `PROJECTS` section label.
- Update project list items (14px/500 name, 12px muted task count).
- Style the active project with a 2px solid left border `#1A1A1A` and light background tint `#EFEDE8`.
- Add hover state on sidebar items.
- Move Logout button to the bottom with muted red text and `ti-logout`.

### STEP 4 — Stats row

#### [MODIFY] app/(dashboard)/dashboard/page.tsx
- Redesign all 5 stat cards to use specific background tints, number colors, and paddings.
- Add "TASKS PER USER" pill.

### STEP 5 — Project header

#### [MODIFY] app/(dashboard)/projects/[id]/page.tsx
- Replace the bold project name with the `ADMIN WORKSPACE` label and a 28px/500 project name.
- Add the 8px status dot computed from task data.
- Update description to 13px muted, max 2 lines, with ellipsis.

### STEP 6 — Extract components

#### [NEW] components/TaskCard.tsx
- Extract the TaskCard component out of the project page.

#### [NEW] components/CreateTaskPanel.tsx
- Extract the CreateTaskPanel component out of the project page, keeping state intact.

### STEP 7 — Kanban board

#### [MODIFY] app/(dashboard)/projects/[id]/page.tsx
- Update column headers and 20px gaps.
- Remove status dropdown inside TaskCard.
- Add 3px left border based on priority.
- Update typography, tags row, overdue styling, hover-only delete button (Admin only), and empty column placeholder.

### STEP 8 — CreateTaskPanel component

#### [MODIFY] components/CreateTaskPanel.tsx
- Implement the requested 36px inputs, 8px radius, colored priority dots, initials circle for assignee.
- Implement the dark full-width submit button.
- Add `<hr>` and Add Member section.
- Apply Role-based rendering (Admin sees form, Member sees read-only).

### STEP 9 — Route protection

#### [NEW/MODIFY] middleware.ts (or equivalent route guard)
- Add redirect logic for Members attempting to access Admin-only routes, redirecting them to a specific error message screen.

### STEP 10 — Final polish

- Add empty states across the app.
- Dynamically update `<title>` to `{projectName} — TTM`.
- Ensure all cursor pointers and font weight rules are strictly applied.

## Verification Plan

### Manual Verification
- Start the development server.
- Verify that there are no CSS breakages after the global theme replacement.
- Confirm that the UI matches the exact specifications.
