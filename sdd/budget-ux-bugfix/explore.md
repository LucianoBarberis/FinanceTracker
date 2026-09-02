# Exploration: Budget Feature + Dashboard UX/Bug Analysis

## Exploration: Budget Feature & Dashboard — Bugs, Data Flow, and UX

### Current State

The dashboard (`App.jsx`) renders: Header → Hero → InfoCards → ActionSection → Budget(budgetToRender={2}) → AnalitycSection.

Budget feature consists of:
- **Budget.jsx** — container: fetches budgets + categories, renders BudgetCard grid + modals
- **BudgetCard.jsx** — card: shows category name, progress bar (`$spent/$limit`), edit/delete menu
- **NewBudgetModal.jsx** — create form: amount + category select (filters out already-budgeted categories)
- **EditBudgetModal.jsx** — edit form: amount only (category is fixed after creation)
- **Redux**: normalized state (`byId[categoryId]` / `allIds`) with 4 async thunks (CRUD)

Backend BudgetDTO shape: `{ id, amount, categoryId, userId, spentAmount }`

---

### A) THE BUDGET BUG — Delete Doesn't Update UI

**Root cause**: `state.byId` is keyed by `categoryId`, but the delete flow passes the budget's **primary key** (`id`) through the entire chain and tries to remove it using that PK.

**Bug chain**:

| Step | File:Line | What happens |
|------|-----------|-------------|
| 1 | `Budget.jsx:44` | `dispatch(deleteBudget(selectedBudget.id))` — passes budget PK |
| 2 | `deleteBudgetAction.js:4` | Parameter named `categoryId` but receives budget PK. Returns it as `action.payload` |
| 3 | `budgetReducer.js:74` | `const categoryId = action.payload;` — this is actually the budget PK |
| 4 | `budgetReducer.js:75-76` | `delete state.byId[categoryId]` — tries to delete by budget PK, but state.byId is keyed by categoryId. **Does nothing.** |

**Result**: Backend deletes the budget (HTTP 204), toast shows "eliminado correctamente", modal closes — but the BudgetCard remains visible until page refresh.

**Fix needed** (two options):
1. **Cleanest**: In `Budget.jsx`, send the budget's `categoryId` to the delete thunk, OR
2. **In deleteBudgetAction**: receive both `budgetId` (for URL) and `categoryId` (for return value), OR
3. **Brute force**: Re-dispatch `getBudgets()` after successful delete

### B) `budgetToRender={2}`

```jsx
// Budget.jsx:53-55
const budgetsToDisplay = useMemo(() => {
    return budgetToRender ? budgets.slice(0, budgetToRender) : budgets
}, [budgets, budgetToRender])
```

`budgetToRender={2}` (from `App.jsx:43`) limits the dashboard to showing **at most 2 budget cards** + the "Add" button. This is intentional dashboard design (similar to `transactionsToRender={20}` in AnalitycSection), but:
- Users with 3+ budgets won't see the rest on the dashboard
- There's no dedicated "View All Budgets" page/link
- The "+ Añadir nuevo límite" button always shows, even with 0 budgets

**Not a bug** but a UX limitation worth addressing (e.g., "Ver todos" link when > 2 budgets exist).

### C) Backend-Frontend Field Alignment

**BudgetDTO** (backend): `{ id, amount, categoryId, userId, spentAmount }`

| Frontend usage | Field | Match? |
|----------------|-------|--------|
| `Budget.jsx:71` key | `ele.categoryId` | ✅ |
| `Budget.jsx:72` title lookup | `catDictionary[ele.categoryId]` | ✅ |
| `Budget.jsx:73` spent | `ele.spentAmount` | ✅ |
| `Budget.jsx:74` limit | `ele.amount` | ✅ |
| `BudgetCard.jsx:42` progress | `max={total}` (amount), `value={value}` (spentAmount) | ✅ |
| `NewBudgetModal.jsx:17` filter | `budget.categoryId === cat.id` | ✅ |

**No field name mismatches.** Frontend correctly expects and uses `spentAmount`, `amount`, `categoryId`, and `id`.

**Minor issues found**:
- `EditBudgetModal.jsx:14`: Initial state uses `budget?.budgetId` — should be `budget?.id`. The `useEffect` corrects this, but initial state is technically wrong.
- `putBudgetAction.js:20`: Returns form data (`budgetData`) instead of backend response. Reducer can't update `spentAmount` from the stale response.

### D) UX Quality Summary

**CSS approach**: Plain CSS files per component (no CSS modules, no Tailwind, no CSS-in-JS). Theming via CSS custom properties in `styles/index.css`. Full light/dark mode support.

**Color scheme**: Blue brand palette (#155EEF primary), gray backgrounds, white cards with subtle shadows. Consistent.

**What's decent**:
- Responsive grid layouts (3-col → 2-col → 1-col at 1024px/768px)
- Dark mode implementation is solid
- Loading state for Budget section (shows spinner)
- Modal animations (fade in/out via Modal component)
- BudgetCard progress bar with transitions

**What's broken/ugly**:

| Issue | Severity | File |
|-------|----------|------|
| InfoCard shows hardcoded `10,5%` — not real data | Medium | `InfoCard.jsx:12` |
| InfoCard uses `--font-big--color` variable — undefined in index.css (renders default) | Low | `InfoCard.css:28` |
| BudgetCard typo: `budgetTilte` class name (works but messy) | Low | `BudgetCard.jsx:22` |
| No empty state for Budget section (0 budgets = just "Add" button, no message) | Medium | `Budget.jsx:66-82` |
| Delete failure is silent — no error toast | Medium | `Budget.jsx:43-51` |
| Edit shows generic "Error del servidor" — no specific message | Low | `EditBudgetModal.jsx:35` |
| Progress bar doesn't visually indicate over-budget (value > total) | Medium | `BudgetCard.jsx:42` |
| BudgetCard has no percentage/remaining display — just raw `$spent/$total` | Low | `BudgetCard.jsx:43` |

### E) Error / Loading / Empty States

| Component | Loading | Empty | Error |
|-----------|---------|-------|-------|
| **Budget** | ✅ Shows `<Loading />` spinner | ⚠️ Shows only "Add" button, no "No budgets yet" message | ❌ Silent — rejected thunk just sets `loading: false`, no error UI |
| **BudgetCard** | N/A | N/A | N/A |
| **NewBudgetModal** | ❌ No loading indicator during submit | N/A | ⚠️ Generic toast "Error al validar" or no toast on server error |
| **EditBudgetModal** | ❌ No loading indicator during submit | N/A | ⚠️ Generic "Error del servidor" toast |
| **InfoCards** | ❌ No loading/error handling | N/A | ❌ Silent |
| **ActionSection** | ❌ No loading during transaction submit | N/A | ⚠️ Toast only |
| **Hero** | ✅ Filter buttons always visible | N/A | N/A |

---

### Recommendation

**Priority 1 — Fix the delete bug** (1 file change):
- `deleteBudgetAction.js`: Change the thunk signature to accept `{ budgetId, categoryId }` and return `categoryId`
- `Budget.jsx`: Change dispatch to `deleteBudget({ budgetId: selectedBudget.id, categoryId: selectedBudget.categoryId })`
- `budgetReducer.js`: Already uses `action.payload` (now correctly categoryId) — no change needed

**Priority 2 — Fix putBudget stale response** (1 file):
- `putBudgetAction.js:20`: Change `return budgetData` to `return (await response.json())` to get the actual backend response with updated `spentAmount`

**Priority 3 — UX quick wins** (2-3 files):
- `InfoCard.jsx`: Replace hardcoded `10,5%` with real data or remove the placeholder
- `Budget.jsx`: Add empty state message when no budgets exist
- `BudgetCard.jsx`: Add percentage calculation or "remaining" display
- `EditBudgetModal.jsx:14`: Fix `budget?.budgetId` → `budget?.id`

### Files That Would Change

**To fix the budget delete bug:**
1. `features/budget/redux/deleteBudgetAction.js` — accept `{ budgetId, categoryId }`, use budgetId for URL, return categoryId
2. `features/budget/components/Budget/Budget.jsx` — change dispatch argument

**To fix putBudget stale data:**
3. `features/budget/redux/putBudgetAction.js` — return backend response instead of form data

**To improve dashboard UX:**
4. `features/analytics/components/InfoCard/InfoCard.jsx` — fix hardcoded percentage
5. `features/budget/components/Budget/Budget.jsx` — add empty state
6. `features/budget/components/BudgetCard/BudgetCard.jsx` — add percentage/remaining, fix typo
7. `features/budget/components/EditBudgetModal/EditBudgetModal.jsx` — fix initial state field name
