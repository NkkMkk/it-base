# **WHERE clause**

---

Now talking about the `WHERE` clause. You'll see how to use `WHERE` with comparison operators and logical operators, plus a short note on coding style.

## **Purpose of `WHERE`**

---

`WHERE` filters rows from the table. It evaluates a condition for each row and includes the row in the result set only if the condition is true.

Basic syntax (see `WHERE` reference: [PostgreSQL — WHERE](https://www.postgresql.org/docs/current/sql-select.html#SQL-WHERE)):

```sql
SELECT column_1, column_2, ...
FROM table_name
WHERE some_condition;
```

`some_condition` is an expression rows must satisfy to be returned.

## **Comparison operators**

---

Common operators you can use inside `WHERE` (see also: [Comparison Functions and Operators](https://www.postgresql.org/docs/current/functions-comparison.html)):

- `=`  — equal
- `!=` — not equal
- `>`  — greater than
- `<`  — less than
- `>=` — greater than or equal
- `<=` — less than or equal

### **Example — filter users by age**

---

| first_name | age |
|------------|-----:|
| Alice      |   18 |
| Bob        |   25 |
| John       |   23 |

> Select rows where age > 20

```sql
SELECT *
FROM users
WHERE age > 20;
```

> Result

```text
first_name  age
Bob         25
John        23
```

### **Date example (note single quotes around the date literal)**

---

| first_name | birth_date |
|------------|------------|
| Alice      | 1997-05-21 |
| Bob        | 2001-02-16 |
| John       | 1992-11-03 |

> Select rows where birth_date < '2000-01-01'

```sql
SELECT *
FROM users
WHERE birth_date < '2000-01-01';
```

> Result

| first_name | birth_date |
|------------|------------|
| Alice      | 1997-05-21 |
| John       | 1992-11-03 |

## **Logical operators: AND, OR, NOT**

---

Logical operators let you combine simple conditions into richer predicates. SQL uses three primary logical operators: NOT, AND, and OR. Remember SQL implements three-valued logic (TRUE, FALSE, UNKNOWN) when NULLs are involved. See: [Conditional Expressions and Boolean Functions](https://www.postgresql.org/docs/current/functions-conditional.html).

### **Combine conditions using `AND`, `OR`, and `NOT`**

---

#### **AND — all conditions must be true**

the condition_1 AND condition_2 must both be true for the row to be included.

```sql
SELECT *
FROM table_name
WHERE condition_1 AND condition_2;
```

| first_name | age | city |
|------------|----:|------|
| Alice      |  18 | Vilnius |
| Bob        |  25 | Vilnius |
| John       |  23 | Kaunas |

> Example — select 18-year-olds in Vilnius:

```sql
SELECT *
FROM users
WHERE city = 'Vilnius' AND age = 18;
```

> Result

| first_name | age | city |
|------------|----:|------|
| Alice      |  18 | Vilnius |

#### **OR — at least one condition must be true**

the condition_1 OR condition_2 must be true for the row to be included.

```sql
SELECT *
FROM table_name
WHERE condition_1 OR condition_2;
```

> Example — select ages 18 or 23

```sql
SELECT *
FROM users
WHERE age = 18 OR age = 23;
```

> Result

| first_name | age | city   |
|------------|----:|--------|
| Alice      |  18 | Vilnius |
| John       |  23 | Kaunas  |

#### **NOT — negate a condition**

the NOT condition negates the truth value of the condition.

```sql
SELECT *
FROM table_name
WHERE NOT condition;
```

> Example — rows where city is not `'Vilnius'`

```sql
SELECT *
FROM users
WHERE NOT city = 'Vilnius';
```

> Equivalent using `!=`

```sql
SELECT *
FROM users
WHERE city != 'Vilnius';
```

### **`BETWEEN`, `LIKE`, and `IN` for ranges**

---

You can also use `BETWEEN`, `LIKE`, and `IN` for ranges, pattern matching and set membership — see the docs: [Comparison / Pattern Matching](https://www.postgresql.org/docs/current/functions-comparison.html) and [Pattern Matching](https://www.postgresql.org/docs/current/functions-matching.html).

### **`BETWEEN` (inclusive range)**

BETWEEN returns values within the given range, inclusive of the endpoints.

```sql
SELECT *
FROM table_name
WHERE column_name BETWEEN value1 AND value2;
```

> Example — filter users by age

| id | first_name | age |
|---:|-----------:|----:|
| 1 | Anna       | 19 |
| 2 | Maria      | 24 |
| 3 | Tom        | 30 |

```sql
SELECT id, first_name, age
FROM users
WHERE age BETWEEN 20 AND 30;
```

> Result

| id | first_name | age |
|---:|-----------:|----:|
| 2 | Maria      | 24 |
| 3 | Tom        | 30 |

### **LIKE (pattern matching)**

Use % for any-length wildcard and _ for a single character.

> Example query to find usernames starting with "ju"

| id | username |
|---:|---------|
| 1 | lisa01 |
| 2 | ben_s |
| 3 | julia |

```sql
SELECT id, username
FROM accounts
WHERE username LIKE 'ju%';
```

> Result

| id | username |
|---:|---------|
| 3 | julia |

> Example query to find usernames with 'b' as the first letter and 'n' as the third letter

```sql
SELECT id, username
FROM accounts
WHERE username LIKE 'b_n%';
```

> Matches "ben_s" (underscore matches one character).
> Case sensitivity depends on the database collation.

### **IN (set membership)**

IN is shorthand for multiple OR comparisons.

> Example query to find countries 'France' or 'Spain'

| id | country |
|---:|---------|
| 1 | France |
| 2 | Italy  |
| 3 | Germany |
| 4 | Spain  |

```sql
SELECT id, country
FROM locations
WHERE country IN ('France', 'Spain');
```

> Result

| id | country |
|---:|---------|
| 1 | France |
| 4 | Spain |

> Note: IN ignores NULL values unless you explicitly include NULL (e.g., WHERE country IN ('France', NULL)).

## **Coding style**

---

SQL is case-insensitive for keywords, but using uppercase for SQL keywords improves readability. Also prefer logical line breaks for each part of the statement.

> Good

```sql
SELECT first_name, age, city
FROM users
WHERE age >= 20 AND city = 'Vilnius';
```

> Bad (hard to read)

```sql
SeLeCT first_name, age, city From users where age >= 20 AND city = 'Vilnius';
```

> Note: SQL identifiers (table and column names) are generally case-insensitive, but textual data stored in the database may be case-sensitive depending on collation/settings — for example, `Jan` and `JAN` can be treated as different values (see [PostgreSQL — Identifiers and Key Words](https://www.postgresql.org/docs/current/sql-syntax-lexical.html#SQL-SYNTAX-IDENTIFIERS)).
