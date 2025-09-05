# Оператор SELECT

Сфокусированное руководство по чтению данных с помощью `SELECT`. Дополняет основы из [Введения в SQL](sql.md).

---
## Что делает SELECT
`SELECT` формирует *набор результатов* (временную табличную проекцию) исходя из:
- выбранных столбцов (проекция)
- строк, прошедших фильтр (фильтрация позже через `WHERE`)
- необязательных трансформаций (выражения, псевдонимы, сортировка, ограничение, удаление дубликатов)

`SELECT` никогда не изменяет данные — только читает.

---
## Минимальная форма
```sql
SELECT 1;
```
Возвращает литерал. Минимальный практический запрос к таблице:
```sql
SELECT id, name
FROM employees;
```

---
## Все столбцы (и почему осторожно)
```sql
SELECT * FROM employees;
```
`*` удобно для быстрой разведки, но в продакшене:
- лишний I/O (ненужные столбцы)
- хрупкость при изменении схемы
- мешает index‑only сканам
Предпочитайте явный список.

---
## Псевдонимы столбцов
```sql
SELECT id AS employee_id,
       first_name || ' ' || last_name AS full_name
FROM employees;
```
Правила:
- `AS` опционально, но повышает ясность
- Кавычки для имен с пробелами / зарезервированными словами: `salary AS "Годовой оклад"`

---
## Литералы и вычисляемые столбцы
```sql
SELECT id,
       salary,
       salary * 0.10 AS bonus_estimate,
       'ACTIVE' AS status_literal
FROM employees;
```
Любое выражение становится производным столбцом.

---
## DISTINCT (удаление дубликатов)
```sql
SELECT DISTINCT department_id
FROM employees;
```
Распространяется на всю выбранную строку:
```sql
SELECT DISTINCT department_id, role
FROM employees;
```
Замечания:
- Дополнительная сортировка / хеширование
- Если нужны агрегаты — возможно `GROUP BY` логичнее

---
## Сортировка ORDER BY
```sql
SELECT id, last_name, hire_date
FROM employees
ORDER BY hire_date DESC, last_name ASC;
```
Примечания:
- Позиционные номера (`ORDER BY 2`) хрупки — лучше имена
- Выполняется после проекции / DISTINCT

---
## Ограничение размера
Варианты:
```sql
-- PostgreSQL / MySQL / SQLite
SELECT * FROM employees ORDER BY id LIMIT 10 OFFSET 20;

-- SQL Server (устаревшее)
SELECT TOP 10 * FROM employees ORDER BY id;

-- Стандарт FETCH FIRST
SELECT * FROM employees ORDER BY id FETCH FIRST 10 ROWS ONLY;
```
Комбинируйте LIMIT + ORDER BY для детерминизма.

---
## Квалификация столбцов
```sql
SELECT e.id, e.first_name, d.name AS department_name
FROM employees e
JOIN departments d ON d.id = e.department_id;
```
Короткие алиасы повышают читаемость.

---
## Анонс фильтрации и JOIN
```sql
SELECT id, name
FROM employees
WHERE active = TRUE; -- WHERE в следующем уроке
```
```sql
SELECT e.id, d.name
FROM employees e
JOIN departments d ON d.id = e.department_id; -- JOIN позже
```

---
## Лучшие практики
| Цель | Совет |
|------|-------|
| Производительность | Выбирайте только нужные столбцы |
| Ясность | Явные `AS` псевдонимы |
| Стабильность | Избегайте `SELECT *` |
| Детерминизм | `ORDER BY` вместе с LIMIT |
| Читаемость | Последовательный порядок столбцов |
| Поддержка | Единый стиль регистра ключевых слов |

---
## Анти‑паттерны
| Анти‑паттерн | Проблема | Лучше |
|--------------|---------|-------|
| `SELECT *` | Избыточность | Явные столбцы |
| `ORDER BY 3` | Хрупко | Имена столбцов |
| LIMIT без ORDER | Недетерминизм | Добавить ORDER BY |
| Частый DISTINCT | Скрытый расход | Очистить источник / GROUP BY |
| Большие списки `IN` | Медленный парсинг | Временная таблица / JOIN |

---
## Подсказки производительности
- Узкая проекция = шанс index‑only scan
- Выражения в SELECT не используют индекс для результата — предвычисляйте
- Простые условия помогают оптимизатору (даже если он переупорядочит)
- LIMIT для API + отдельный `COUNT(*)` для общего числа

