# Klauzula SELECT

Skondensowany przewodnik po odczytywaniu danych przy pomocy `SELECT`. Rozszerza podstawy z [Wprowadzenia do SQL](sql.md).

---
## Co robi SELECT
`SELECT` tworzy *zestaw wynikowy* (tymczasową projekcję tabelaryczną) na podstawie:
- wybranych kolumn (projekcja)
- wierszy, które przejdą filtr (filtracja później z `WHERE`)
- opcjonalnych transformacji (wyrażenia, aliasy, sortowanie, limitowanie, deduplikacja)

`SELECT` nigdy nie modyfikuje danych – tylko je odczytuje.

---
## Minimalna forma
```sql
SELECT 1;
```
Zwraca pojedynczą kolumnę z literałem. Minimalne praktyczne zapytanie do tabeli:
```sql
SELECT id, name
FROM employees;
```

---
## Wybór wszystkich kolumn (i dlaczego ostrożnie)
```sql
SELECT * FROM employees;
```
`*` jest szybkie do eksploracji ad‑hoc, ale w produkcji powoduje:
- zbędny transfer (kolumny nieużywane)
- kruchość – zmiana schematu może zepsuć klienta
- brak optymalizacji typu index‑only
Preferuj jawne listy kolumn.

---
## Aliasy kolumn
Czytelna / jednoznaczna prezentacja:
```sql
SELECT id AS employee_id,
       first_name || ' ' || last_name AS full_name
FROM employees;
```
Zasady:
- `AS` opcjonalne (`id employee_id` działa), ale jawne zwiększa klarowność
- Cudzysłowy dla aliasów z odstępami / słowami zastrzeżonymi: `salary AS "Roczne wynagrodzenie"`

---
## Literały i kolumny obliczane
```sql
SELECT id,
       salary,
       salary * 0.10 AS bonus_estimate,
       'ACTIVE' AS status_literal
FROM employees;
```
Każdy literał / wyrażenie staje się kolumną pochodną.

---
## Usuwanie duplikatów DISTINCT
```sql
SELECT DISTINCT department_id
FROM employees;
```
`DISTINCT` działa na *całym* wierszu (wszystkich projektowanych kolumnach):
```sql
SELECT DISTINCT department_id, role
FROM employees;
```
Uwaga:
- dodatkowe sortowanie / hashowanie (koszt)
- gdy potrzebujesz też agregacji – rozważ `GROUP BY`

---
## Sortowanie ORDER BY
```sql
SELECT id, last_name, hire_date
FROM employees
ORDER BY hire_date DESC, last_name ASC;
```
Notatki:
- `ORDER BY 2` (numer kolumny) możliwe, ale kruche – preferuj nazwy
- Sortowanie po projekcji / DISTINCT

---
## Ograniczanie rozmiaru wyniku
Dialektowe warianty:
```sql
-- PostgreSQL / MySQL / SQLite
SELECT * FROM employees ORDER BY id LIMIT 10 OFFSET 20;

-- SQL Server (legacy)
SELECT TOP 10 * FROM employees ORDER BY id;

-- Standard FETCH FIRST
SELECT * FROM employees ORDER BY id FETCH FIRST 10 ROWS ONLY;
```
Łącz `LIMIT` z `ORDER BY` dla deterministycznej paginacji.

---
## Kwalifikowanie kolumn
Przy złączeniach:
```sql
SELECT e.id, e.first_name, d.name AS department_name
FROM employees e
JOIN departments d ON d.id = e.department_id;
```
Nawet w pojedynczej tabeli krótkie aliasy poprawiają czytelność.

---
## Zapowiedź filtrowania i złączeń
(Szczegóły w kolejnych lekcjach.)
```sql
SELECT id, name
FROM employees
WHERE active = TRUE; -- WHERE w następnej lekcji
```
```sql
SELECT e.id, d.name
FROM employees e
JOIN departments d ON d.id = e.department_id; -- JOIN później
```

---
## Dobre praktyki
| Cel | Wskazówka |
|-----|-----------|
| Wydajność | Projektuj tylko potrzebne kolumny |
| Klarowność | Jawne aliasy `AS` |
| Stabilność | Unikaj `SELECT *` w produkcji |
| Determinizm | Zawsze `ORDER BY` przy `LIMIT` |
| Czytelność | Spójna kolejność kolumn |
| Utrzymanie | Konsekwentna konwencja wielkości liter słów kluczowych |

---
## Antywzorce
| Antywzorzec | Problem | Lepsze |
|------------|---------|--------|
| `SELECT *` | Nadmiar danych | Wymień kolumny |
| `ORDER BY 3` | Kruche | Nazwy kolumn |
| LIMIT bez ORDER | Niejednoznaczne strony | Dodaj `ORDER BY` |
| Nadużycie DISTINCT | Ukryty koszt | Oczyść źródło / `GROUP BY` |
| Długie listy `IN` | Koszt parsowania | Tabela tymczasowa / JOIN |

---
## Wskazówki wydajnościowe
- Wąska projekcja umożliwia index‑only scan
- Wyrażenia w SELECT nie użyją indeksu dla wyniku – pre‑agreguj, jeśli częste
- Wiele silników optymalizuje kolejność filtrów, ale prostota pomaga planowi
- `LIMIT` dla API + osobne `COUNT(*)` dla totalu

