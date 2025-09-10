# SQL

Common SQL patterns and tips.

```sql
-- Top N per group (PostgreSQL)
SELECT DISTINCT ON (user_id) *
FROM events
ORDER BY user_id, created_at DESC;
```
