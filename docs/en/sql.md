# Introduction to SQL and Databases

> **Why care about databases?**
>
> Imagine a library. Every book is a piece of data, and the library is organized so you can quickly find any book. Databases do the same for your applications!

---

## What is a Database?

A **database** is an organized collection of data—a digital library for your information. Data can be text, numbers, images, or even videos.

**Example analogy:**

| Book Title        |
|------------------|
| 1984             |
| Dune             |
| Clean Code       |

Just like a library helps you find books, a database helps you find and manage data.

---

## What is a DBMS?

A **Database Management System (DBMS)** is software that lets you define, store, retrieve, and manage data in a database.

**Key functions:**
- Add, update, or delete data
- Define data structure
- Enforce rules (e.g., no duplicate IDs)

**Popular DBMS:**
- SQLite
- MySQL
- PostgreSQL
- Oracle

---

## What is an RDBMS?

A **Relational Database Management System (RDBMS)** organizes data into tables (like spreadsheets) with rows and columns.

**Why "relational"?**
Tables can be linked (related) to each other, making it easy to connect data from different places.

**Example:**

**Authors Table**

| id | name   |
|----|--------|
| 1  | Alice  |
| 2  | Bob    |

**Books Table**

| id | title   | author_id |
|----|---------|-----------|
| 1  | SQL 101 | 1         |
| 2  | Python  | 2         |

You can link books to authors using the `author_id` column!

**How to create these tables in SQL:**

```sql
CREATE TABLE authors (
    id INTEGER PRIMARY KEY,
    name TEXT
);

CREATE TABLE books (
    id INTEGER PRIMARY KEY,
    title TEXT,
    author_id INTEGER,
    FOREIGN KEY (author_id) REFERENCES authors(id)
);
```

This way, each book is linked to an author by `author_id`.

---

## Real-life Example: Supermarket

When you scan a product at checkout, the system looks up the price in a database—not in the barcode itself.

---

## SQL in Practice

SQL (Structured Query Language) is how we communicate with a database. Here’s an example:

```sql
-- Create a books table
CREATE TABLE books (
    id INTEGER PRIMARY KEY,
    title TEXT,
    author TEXT
);

-- Add a book
INSERT INTO books (title, author) VALUES ('Clean Code', 'Robert C. Martin');

-- Get all books
SELECT * FROM books;
```

---

## Summary
- Databases organize and store data
- DBMS manages databases
- RDBMS uses tables and relationships
- SQL is the language to communicate with a database

> **Next:** Learn about data types and how to design your own tables!

