# **Introduction to SQL**
---

 Structured Query Language ([SQL](https://www.postgresql.org/docs/current/sql.html)) lets you query and manipulate structured data stored in tables. Many Database Management Systems (DBMS) implement SQL or a close dialect of it.

> SQL is commonly pronounced by letters ("S‑Q‑L"), though you'll sometimes hear "sequel".

What you'll learn:

- The difference between databases, DBMS, and RDBMS
- How relational data is organized (tables, rows, columns)
- Common data types and a tiny example schema with sample queries

## **Databases**
---

Data is a collection of individual pieces of information: text, numbers, dates, images, etc. A [database](https://en.wikipedia.org/wiki/Database) is an organized place to store that data so you can search, update, and manage it efficiently.

Think of a library: it stores many books (records). Each book has attributes (title, author, ISBN) just like a record has columns in a table.

Databases are used everywhere: product catalogs, orders, user profiles, analytics, and more. Important business data (prices, stock levels, customer details) should live in the database, not scattered through application code.

## **DBMS (Database Management System)**
---

A [DBMS](https://en.wikipedia.org/wiki/Database_management_system) is the software that manages databases. It provides tools to create schemas, enforce validation rules, run queries, and control access.

Key responsibilities:

- Data definition and storage
- Query processing and optimization
- Transaction management and concurrency control
- Backup, recovery, and security

## **RDBMS (Relational DBMS)**
---


An [RDBMS](https://en.wikipedia.org/wiki/Relational_database) is a DBMS built around the relational model: data is stored in tables with rows and columns. Relationships between tables are expressed via keys, making it easy to join related data in queries.

Popular relational systems:

- [PostgreSQL](https://www.postgresql.org/docs/)
- [MySQL](https://dev.mysql.com/doc/)
- [Oracle Database](https://docs.oracle.com/en/database/)
- [H2 Database](https://www.h2database.com/html/main.html) (lightweight, often used for testing)

Although other database models exist (document, key-value, graph), this lesson focuses on relational databases and SQL.

## **How relational data is organized**
---

Tables are collections of rows (records). Each table defines columns with names and data types (for example: first_name TEXT, age INTEGER). A table can contain millions of rows; the schema defines what each row must look like.

Common concepts:

- Primary key: a column (or set) that uniquely identifies a row
- Foreign key: a column that references a primary key in another table, expressing a relationship
-- Indexes: structures that speed up lookups on specific columns ([PostgreSQL indexes](https://www.postgresql.org/docs/current/indexes.html))

## **Common data types (overview)**
---

- `INTEGER` / `BIGINT` — whole numbers
- `DECIMAL` / `NUMERIC` — fixed-precision numbers (money)
- `FLOAT` / `DOUBLE` — floating-point numbers
- `TEXT` / `VARCHAR` — variable-length strings
- `BOOLEAN` — true/false
- `DATE` / `TIMESTAMP` — dates and times
- `BYTEA` / `BLOB` — binary data (files, images)

## **Example: Simple library schema**
---

This tiny schema shows three related tables: authors, books, and loans. It's intentionally small to illustrate relationships.

```sql
CREATE TABLE authors (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL;
);
```

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | SERIAL | PRIMARY KEY | Author identifier |
| name | TEXT | NOT NULL | Author full name |


```sql
CREATE TABLE books (
	id SERIAL PRIMARY KEY,
	title TEXT NOT NULL,
	author_id INTEGER REFERENCES authors(id),
	published_year INTEGER,
	isbn VARCHAR(20);
);
```

| Column | Type | Constraints | Description |
|---|---|---|------|
| id | SERIAL | PRIMARY KEY | Book identifier |
| title | TEXT | NOT NULL | Book title |
| author_id | INTEGER | REFERENCES authors(id) | Foreign key to authors |
| published_year | INTEGER |  | Year of publication |
| isbn | VARCHAR(20) |  | ISBN code |

```sql
CREATE TABLE loans (
	id SERIAL PRIMARY KEY,
	book_id INTEGER REFERENCES books(id),
	borrower_name TEXT NOT NULL,
	loaned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	returned_at TIMESTAMP;
);
```

| Column | Type | Constraints | Description |
|---|---|---|---|
| id | SERIAL | PRIMARY KEY | Loan identifier |
| book_id | INTEGER | REFERENCES books(id) | Foreign key to books |
| borrower_name | TEXT | NOT NULL | Name of borrower |
| loaned_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | When the book was loaned |
| returned_at | TIMESTAMP |  | When the book was returned (nullable) |


## **Sample queries**
---

- Find all books by a given author:
```sql
SELECT b.title
FROM books b
JOIN authors a ON b.author_id = a.id
WHERE a.name = 'Agatha Christie';
```

- List all books with their authors:
```sql
SELECT b.title, a.name
FROM books b;
```

- List all currently loaned out books:
```sql
SELECT b.title, a.name
FROM books b;
```