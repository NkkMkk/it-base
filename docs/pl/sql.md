# Wprowadzenie do SQL i baz danych

> **Dlaczego warto znać bazy danych?**
> 
> Wyobraź sobie bibliotekę. Każda książka to dane, a biblioteka jest zorganizowana tak, byś mógł szybko znaleźć każdą książkę. Bazy danych robią to samo dla Twoich aplikacji!

---

## Co to jest baza danych?

**Baza danych** to uporządkowany zbiór danych — cyfrowa biblioteka dla Twoich informacji. Dane mogą być tekstem, liczbami, obrazami, a nawet filmami.

**Przykład analogii:**

| Tytuł książki     |
|------------------|
| 1984             |
| Diuna            |
| Czysty kod       |

Tak jak biblioteka pomaga znaleźć książki, baza danych pomaga znaleźć i zarządzać danymi.

---

## Co to jest DBMS?

**System zarządzania bazą danych (DBMS)** to oprogramowanie, które pozwala definiować, przechowywać, pobierać i zarządzać danymi w bazie danych.

**Główne funkcje:**
- Dodawanie, aktualizacja lub usuwanie danych
- Definiowanie struktury danych
- Wymuszanie reguł (np. brak powielonych ID)

**Popularne DBMS:**
- SQLite
- MySQL
- PostgreSQL
- Oracle

---

## Co to jest RDBMS?

**Relacyjny system zarządzania bazą danych (RDBMS)** organizuje dane w tabele (jak arkusze kalkulacyjne) z wierszami i kolumnami.

**Dlaczego "relacyjny"?**
Tabele mogą być powiązane (relacje) ze sobą, co ułatwia łączenie danych z różnych miejsc.

**Przykład:**

**Tabela Autorzy**

| id | imię   |
|----|--------|
| 1  | Alicja |
| 2  | Bartek |

**Tabela Książki**

| id | tytuł   | autor_id |
|----|---------|----------|
| 1  | SQL 101 | 1        |
| 2  | Python  | 2        |

Możesz powiązać książki z autorami za pomocą kolumny `autor_id`!

**Jak utworzyć te tabele w SQL:**

```sql
CREATE TABLE autorzy (
    id INTEGER PRIMARY KEY,
    imie TEXT
);

CREATE TABLE ksiazki (
    id INTEGER PRIMARY KEY,
    tytul TEXT,
    autor_id INTEGER,
    FOREIGN KEY (autor_id) REFERENCES autorzy(id)
);
```

W ten sposób każda książka jest powiązana z autorem przez `autor_id`.

---

## Przykład z życia: Supermarket

Gdy skanujesz produkt przy kasie, system sprawdza cenę w bazie danych — nie w samym kodzie kreskowym.

---

## SQL w praktyce

SQL (Structured Query Language) to sposób komunikacji z bazą danych. Oto przykład:

```sql
-- Utwórz tabelę książek
CREATE TABLE ksiazki (
    id INTEGER PRIMARY KEY,
    tytul TEXT,
    autor TEXT
);

-- Dodaj książkę
INSERT INTO ksiazki (tytul, autor) VALUES ('Czysty kod', 'Robert C. Martin');

-- Pobierz wszystkie książki
SELECT * FROM ksiazki;
```

---

## Podsumowanie
- Bazy danych organizują i przechowują dane
- DBMS zarządza bazami danych
- RDBMS używa tabel i relacji
- SQL to język do komunikacji z bazą danych

> **Dalej:** Dowiedz się o typach danych i jak projektować własne tabele!
