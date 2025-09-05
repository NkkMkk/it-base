# SELECT Clause

A focused guide to reading data with `SELECT`. This builds on the general concepts from the introduction (see [Introduction to SQL](sql.md)).

---
## What SELECT Does
`SELECT` creates a *result set* (a temporary, tabular projection) based on:
- Which columns you project
- Which rows qualify (filtering comes later with `WHERE`)
- Optional transformations (expressions, aliases, sorting, limiting, deduplication)

You never "change" data with `SELECT`; you only read.

---
## Minimal Form
```sql
SELECT 1;
```
Returns a single column with a literal. Practical minimal table query:
```sql
SELECT id, name
FROM employees;
```

---
## Selecting All Columns (and Why to Be Careful)
```sql
SELECT * FROM employees;
```
`*` is quick for ad‑hoc exploration, but in production:
- Unnecessary I/O (unused columns transferred)
- Fragile: future schema changes can break clients
- Prevents covering‑index optimizations
Prefer explicit columns.

---
## Column Aliases
Readable / disambiguated output:
```sql
SELECT id AS employee_id,
       first_name || ' ' || last_name AS full_name
FROM employees;
```
Rules:
- `AS` is optional (`id employee_id` also works) but be explicit for clarity.
- Use quotes for aliases with spaces / reserved words: `salary AS "Annual Salary"`.

---
## Literals & Computed Columns
```sql
SELECT id,
       salary,
       salary * 0.10 AS bonus_estimate,
       'ACTIVE' AS status_literal
FROM employees;
```
Anything not a column (number, string, expression) becomes a derived column.

---
## Removing Duplicates with DISTINCT
```sql
SELECT DISTINCT department_id
FROM employees;
```
`DISTINCT` applies to the *entire* selected row (all projected columns). For two columns:
```sql
SELECT DISTINCT department_id, role
FROM employees;
```
Caveats:
- Extra sort / hash step (can be expensive)
- Sometimes a `GROUP BY` (with aggregates) is clearer if you also need counts

---
## Sorting with ORDER BY
```sql
SELECT id, last_name, hire_date
FROM employees
ORDER BY hire_date DESC, last_name ASC;
```
Notes:
- `ORDER BY 2` (ordinal) is allowed but brittle; prefer names
- Sorting happens *after* projection / DISTINCT

---
## Limiting Result Size
Common patterns by dialect:
```sql
-- ANSI / PostgreSQL / MySQL / SQLite
SELECT * FROM employees ORDER BY id LIMIT 10 OFFSET 20;

-- SQL Server legacy
SELECT TOP 10 * FROM employees ORDER BY id;

-- Standard (modern, some engines)
SELECT * FROM employees ORDER BY id FETCH FIRST 10 ROWS ONLY;
```
Use ORDER BY with LIMIT for deterministic paging.

---
## Qualifying Columns
When joining (later), qualify:
```sql
SELECT e.id, e.first_name, d.name AS department_name
FROM employees e
JOIN departments d ON d.id = e.department_id;
```
Even in single‑table queries, short aliases improve readability if reused often.

---
## Preview of Filtering & Joins
(Details covered in next lessons.)
```sql
SELECT id, name
FROM employees
WHERE active = TRUE; -- filtering (upcoming WHERE lesson)
```
```sql
SELECT e.id, d.name
FROM employees e
JOIN departments d ON d.id = e.department_id; -- upcoming JOIN lesson
```

---
## Best Practices
| Goal | Tip |
|------|-----|
| Performance | Project only needed columns |
| Clarity | Use explicit `AS` aliases |
| Stability | Avoid `SELECT *` in production |
| Correctness | Pair `LIMIT` with `ORDER BY` |
| Readability | Consistent column ordering |
| Maintainability | Lowercase keywords or uppercase consistently (team style) |

---
## Common Anti‑Patterns
| Anti‑Pattern | Issue | Better |
|-------------|------|--------|
| `SELECT *` | Overfetch | List columns |
| Ordinal ORDER BY (`ORDER BY 3`) | Fragile | Name columns |
| No ORDER with LIMIT | Non‑deterministic pages | Add ORDER BY |
| Overusing DISTINCT | Hidden performance cost | Clean source / use GROUP BY |
| Huge `IN` lists | Slow parse / plan | Temp table / JOIN |

---
## Performance Hints
- Narrow projection can enable index‑only scans
- Calculated expressions in SELECT do **not** use indexes for that expression result; precompute if heavily reused
- Place cheap filters (later with WHERE) early for optimizer clarity (some engines reorder anyway)
- Use LIMIT for API endpoints but communicate total count separately (e.g., secondary COUNT(*) query)