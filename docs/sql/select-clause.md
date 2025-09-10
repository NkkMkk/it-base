# **SELECT clause**
---

 Structured Query Language ([SQL](https://www.postgresql.org/docs/current/sql.html)) is the standard language for working with relational databases.

What you'll learn:

- The purpose of [`SELECT`](https://www.postgresql.org/docs/current/sql-select.html) and how to choose columns
- How to select all columns with `*`
- How to write single-line and multi-line [comments](https://www.postgresql.org/docs/current/sql-syntax-lexical.html#SQL-SYNTAX-COMMENTS) in SQL
- A few quick examples you can try

## **CRUD**
---

Working with databases typically involves four operations: [Create, Read, Update, Delete (CRUD)](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete). This lesson focuses on Read — retrieving data with [`SELECT`](https://www.postgresql.org/docs/current/sql-select.html).

`SELECT` returns a result set (a table of rows) based on the columns and table you specify.

## **SELECT statement syntax**
---

The basic form is:

```sql
SELECT column_1, column_2, ...
FROM table_name;
```

- `column_1, column_2, ...` — the columns to return
- `table_name` — the table to read from

To return every column from the table use `*`:

```sql
SELECT *
FROM table_name;
```

## **Comments**
---

Comments explain SQL statements or temporarily disable them. Two common styles are supported (see the [comments section of the SQL lexical rules](https://www.postgresql.org/docs/current/sql-syntax-lexical.html#SQL-SYNTAX-COMMENTS)):

- Single-line comments start with `--` and run to the end of the line:

```sql
-- SELECT * FROM actor;
SELECT * FROM movie;
```

- Multi-line comments are enclosed between `/*` and `*/`:

```sql
/* SELECT name FROM actor;
	SELECT title FROM book; */
SELECT title FROM movie;
```

## **Quick examples**
---

- Select specific columns:

```sql
SELECT id, title, published_year
FROM books;
```

- Select all columns:

```sql
SELECT *
FROM authors;
```

- Use a comment to temporarily disable a query while testing:

```sql
-- SELECT * FROM loans;
SELECT id, borrower_name
FROM loans
WHERE returned_at IS NULL;
```