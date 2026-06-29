export interface SqlRoadmapTopic {
  id: string;
  title: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: number;
  description: string;
  keyPoints: string[];
  codeExample?: string;
  resources: string[];
}

export interface SqlRoadmapCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  order: number;
}

export const sqlCategories: SqlRoadmapCategory[] = [
  { id: 'basics', name: 'SQL Basics', icon: '📊', color: '#3b82f6', description: 'Relational databases, data types, and basic SQL syntax', order: 1 },
  { id: 'ddl', name: 'Data Definition Language', icon: '🏗', color: '#8b5cf6', description: 'CREATE, ALTER, DROP — defining database structure', order: 2 },
  { id: 'dml', name: 'Data Manipulation Language', icon: '✏', color: '#10b981', description: 'SELECT, INSERT, UPDATE, DELETE — working with data', order: 3 },
  { id: 'joins', name: 'JOIN Queries', icon: '🔗', color: '#ef4444', description: 'INNER, LEFT, RIGHT, FULL OUTER, SELF, CROSS joins', order: 4 },
  { id: 'subqueries', name: 'Subqueries', icon: '📥', color: '#06b6d4', description: 'Nested queries, correlated subqueries, EXISTS', order: 5 },
  { id: 'functions', name: 'Advanced Functions', icon: '⚙', color: '#f97316', description: 'String, numeric, date functions, CASE expressions', order: 6 },
  { id: 'views-indexes', name: 'Views & Indexes', icon: '📑', color: '#84cc16', description: 'CREATE VIEW, indexes for performance, EXPLAIN', order: 7 },
  { id: 'transactions', name: 'Transactions & ACID', icon: '🔒', color: '#ec4899', description: 'BEGIN, COMMIT, ROLLBACK, isolation levels', order: 8 },
  { id: 'security', name: 'Data Integrity & Security', icon: '🛡', color: '#14b8a6', description: 'Constraints, GRANT/REVOKE, row-level security', order: 9 },
  { id: 'performance', name: 'Performance Optimization', icon: '⚡', color: '#a855f7', description: 'EXPLAIN ANALYZE, index strategy, query tuning', order: 10 },
  { id: 'advanced', name: 'Advanced SQL', icon: '🚀', color: '#64748b', description: 'Window functions, CTEs, recursive queries, stored procedures', order: 11 },
  { id: 'stored', name: 'Stored Procedures', icon: '🗂', color: '#f59e0b', description: 'PL/pgSQL functions, triggers, dynamic SQL', order: 12 },
];

export const sqlTopics: SqlRoadmapTopic[] = [
  // BASICS
  {
    id: 'what-are-rdbms',
    title: 'What are Relational Databases?',
    category: 'basics',
    level: 'beginner',
    estimatedHours: 2,
    description: 'Tables, rows, columns, primary keys, and how relational databases organize data',
    keyPoints: [
      'A relational database stores data in tables (relations) — rows (records) and columns (attributes)',
      'Primary key: uniquely identifies each row in a table (e.g., id INTEGER PRIMARY KEY)',
      'Foreign key: column referencing a primary key in another table — enforces referential integrity',
      'Relationships: one-to-one, one-to-many, many-to-many (via join table)',
      'Schema: the structure definition of tables, types, constraints — separate from the data itself',
      'RDBMS examples: PostgreSQL, MySQL, SQLite, SQL Server, Oracle',
      'ACID properties: Atomicity, Consistency, Isolation, Durability — guarantees for transactions',
      'SQL vs NoSQL: SQL excels at complex queries and relationships; NoSQL at scale and schema flexibility',
    ],
    codeExample: `-- A simple relational schema
CREATE TABLE users (
    id        SERIAL PRIMARY KEY,
    email     VARCHAR(255) UNIQUE NOT NULL,
    name      VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE orders (
    id      SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    total   DECIMAL(10, 2) NOT NULL,
    status  VARCHAR(50) DEFAULT 'pending'
);

-- One user can have many orders (one-to-many relationship)`,
    resources: ['PostgreSQL Documentation', 'SQL Tutorial (w3schools)', 'Database Design (Coursera)'],
  },
  {
    id: 'data-types',
    title: 'SQL Data Types',
    category: 'basics',
    level: 'beginner',
    estimatedHours: 2,
    description: 'Choosing the right data types — numeric, text, date/time, boolean, and JSON',
    keyPoints: [
      'Integer types: SMALLINT (2 bytes), INTEGER (4 bytes), BIGINT (8 bytes), SERIAL (auto-increment)',
      'Decimal types: DECIMAL(p,s) / NUMERIC — exact; FLOAT/REAL — approximate (avoid for money)',
      'Text types: CHAR(n) — fixed width; VARCHAR(n) — variable up to n; TEXT — unlimited length',
      'Date/Time: DATE (date only), TIME, TIMESTAMP (date+time), TIMESTAMPTZ (with timezone)',
      'Boolean: TRUE/FALSE/NULL in PostgreSQL — store yes/no flags cleanly',
      'JSON: JSON (stored as text, validated) vs JSONB (binary, indexed, faster queries) in PostgreSQL',
      'UUID: universally unique identifier — good for distributed systems primary keys',
      'Always use TIMESTAMPTZ over TIMESTAMP to avoid timezone conversion bugs',
    ],
    codeExample: `CREATE TABLE products (
    id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name        VARCHAR(200) NOT NULL,
    description TEXT,
    price       DECIMAL(10, 2) NOT NULL,        -- exact decimal for money
    in_stock    BOOLEAN DEFAULT TRUE,
    quantity    INTEGER DEFAULT 0,
    metadata    JSONB,                          -- structured JSON (indexed)
    created_at  TIMESTAMPTZ DEFAULT NOW(),     -- timestamp with timezone
    tags        TEXT[]                          -- array of strings (PostgreSQL)
);

-- Insert example
INSERT INTO products (name, price, metadata, tags)
VALUES ('Laptop', 999.99, '{"brand": "Dell", "ram": 16}', ARRAY['electronics', 'computer']);`,
    resources: ['PostgreSQL Data Types', 'Choosing the Right Data Type'],
  },

  // DDL
  {
    id: 'create-table',
    title: 'CREATE TABLE',
    category: 'ddl',
    level: 'beginner',
    estimatedHours: 2,
    description: 'Defining tables with column types, defaults, and constraints',
    keyPoints: [
      'CREATE TABLE name (column_name data_type [constraints], ...)',
      'NOT NULL: column must always have a value — never NULL',
      'DEFAULT: value used when INSERT omits the column',
      'SERIAL / GENERATED ALWAYS AS IDENTITY — auto-incrementing integer primary keys',
      'CREATE TABLE IF NOT EXISTS — avoids error if table already exists',
      'CREATE TABLE new_table AS SELECT ... — creates a table from a query result',
      'Temporary tables: CREATE TEMP TABLE — exists only for the current session',
      'Column-level vs table-level constraints: table-level needed for composite constraints',
    ],
    codeExample: `-- Full CREATE TABLE example
CREATE TABLE employees (
    id          SERIAL PRIMARY KEY,
    first_name  VARCHAR(100) NOT NULL,
    last_name   VARCHAR(100) NOT NULL,
    email       VARCHAR(255) UNIQUE NOT NULL,
    salary      DECIMAL(12, 2) DEFAULT 50000.00,
    dept_id     INTEGER REFERENCES departments(id),
    hire_date   DATE DEFAULT CURRENT_DATE,
    is_active   BOOLEAN DEFAULT TRUE,
    -- Table-level composite unique constraint
    CONSTRAINT uq_name_dept UNIQUE (first_name, last_name, dept_id)
);

-- Create from query
CREATE TABLE active_employees AS
SELECT * FROM employees WHERE is_active = TRUE;

-- Temporary table (session-scoped)
CREATE TEMP TABLE temp_results (id INT, score FLOAT);`,
    resources: ['PostgreSQL CREATE TABLE', 'SQL DDL Reference'],
  },
  {
    id: 'data-constraints',
    title: 'Data Constraints',
    category: 'ddl',
    level: 'beginner',
    estimatedHours: 3,
    description: 'PRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK, NOT NULL — enforcing data integrity at the DB level',
    keyPoints: [
      'PRIMARY KEY: unique + NOT NULL — the row identifier; each table should have one',
      'FOREIGN KEY: references another table\'s PK — prevents orphan records',
      'ON DELETE CASCADE: deletes child rows when parent is deleted',
      'ON DELETE SET NULL: sets FK column to NULL when parent is deleted',
      'UNIQUE: ensures no two rows have the same value in that column (allows one NULL)',
      'CHECK: custom condition that must be true — e.g., CHECK (price > 0)',
      'NOT NULL: column cannot be NULL — combine with DEFAULT for safe inserts',
      'Deferrable constraints: DEFERRABLE INITIALLY DEFERRED — check at transaction end, not each statement',
    ],
    codeExample: `CREATE TABLE orders (
    id          SERIAL PRIMARY KEY,
    user_id     INTEGER NOT NULL
                    REFERENCES users(id)
                    ON DELETE CASCADE
                    ON UPDATE CASCADE,
    status      VARCHAR(20) NOT NULL
                    DEFAULT 'pending'
                    CHECK (status IN ('pending', 'paid', 'shipped', 'cancelled')),
    total       DECIMAL(10, 2) NOT NULL
                    CHECK (total >= 0),
    discount    DECIMAL(5, 2) DEFAULT 0
                    CHECK (discount BETWEEN 0 AND 100),
    coupon_code VARCHAR(20) UNIQUE,  -- one coupon per order, but optional
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT chk_discount_not_exceed_total CHECK (discount <= total)
);

-- Add constraint to existing table
ALTER TABLE products
ADD CONSTRAINT chk_positive_price CHECK (price > 0);`,
    resources: ['PostgreSQL Constraints', 'Data Integrity in SQL'],
  },
  {
    id: 'alter-drop',
    title: 'ALTER TABLE & DROP',
    category: 'ddl',
    level: 'beginner',
    estimatedHours: 2,
    description: 'Modify existing tables and safely remove schema objects',
    keyPoints: [
      'ALTER TABLE ADD COLUMN — adds a new column; safe on large tables if column is nullable',
      'ALTER TABLE DROP COLUMN — removes column; CASCADE drops dependent views/constraints',
      'ALTER TABLE RENAME COLUMN old TO new — rename without data loss',
      'ALTER TABLE ALTER COLUMN TYPE — changes type; may require USING clause for conversion',
      'DROP TABLE IF EXISTS — avoids error if table does not exist',
      'TRUNCATE: removes all rows fast (resets sequences); cannot be rolled back easily',
      'DROP TABLE CASCADE: also drops views, foreign keys, and other dependent objects — use carefully',
      'In production: adding nullable columns is safe; dropping or renaming requires careful migrations',
    ],
    codeExample: `-- Add columns
ALTER TABLE users
    ADD COLUMN phone VARCHAR(20),
    ADD COLUMN last_login TIMESTAMPTZ;

-- Rename
ALTER TABLE users RENAME COLUMN phone TO phone_number;

-- Change type (with casting)
ALTER TABLE products
    ALTER COLUMN price TYPE BIGINT USING (price * 100)::BIGINT;

-- Drop column
ALTER TABLE users DROP COLUMN IF EXISTS legacy_field CASCADE;

-- Drop table safely
DROP TABLE IF EXISTS temp_results;

-- TRUNCATE (faster than DELETE FROM for clearing all rows)
TRUNCATE TABLE audit_logs RESTART IDENTITY;  -- resets SERIAL counter

-- DROP TABLE with cascade (drops dependent views too)
DROP TABLE IF EXISTS orders CASCADE;`,
    resources: ['PostgreSQL ALTER TABLE', 'Safe Database Migrations'],
  },

  // DML
  {
    id: 'select-basics',
    title: 'SELECT Statement',
    category: 'dml',
    level: 'beginner',
    estimatedHours: 3,
    description: 'Query data with SELECT — column aliases, expressions, DISTINCT, and NULL handling',
    keyPoints: [
      'SELECT col1, col2 FROM table — fetch specific columns; SELECT * fetches all (avoid in production)',
      'AS alias — rename columns in output: SELECT name AS full_name',
      'DISTINCT: removes duplicate rows from result',
      'Expressions in SELECT: SELECT price * quantity AS total, UPPER(name)',
      'NULL arithmetic: any arithmetic with NULL returns NULL — use COALESCE(col, 0) as default',
      'String concatenation: name || \' \' || surname (SQL standard) or CONCAT(name, \' \', surname)',
      'ORDER BY sorts results: ASC (default) or DESC; multiple columns: ORDER BY last_name, first_name',
      'LIMIT / OFFSET for pagination: LIMIT 10 OFFSET 20 (skip 20, take 10)',
    ],
    codeExample: `-- Basic SELECT
SELECT id, first_name, last_name, salary
FROM employees;

-- Aliases and expressions
SELECT
    id,
    first_name || ' ' || last_name AS full_name,
    salary * 12                    AS annual_salary,
    UPPER(department)              AS dept
FROM employees;

-- DISTINCT: unique departments
SELECT DISTINCT department FROM employees;

-- NULL handling with COALESCE
SELECT
    name,
    COALESCE(phone, 'No phone') AS phone,
    COALESCE(salary, 0)         AS salary
FROM employees;

-- Sorted and paginated
SELECT * FROM products
ORDER BY price DESC, name ASC
LIMIT 10 OFFSET 0;  -- page 1`,
    resources: ['PostgreSQL SELECT', 'SQL SELECT Tutorial'],
  },
  {
    id: 'where-clause',
    title: 'WHERE Clause & Filtering',
    category: 'dml',
    level: 'beginner',
    estimatedHours: 2,
    description: 'Filter rows with comparison operators, BETWEEN, IN, LIKE, and NULL checks',
    keyPoints: [
      'Comparison: =, <>, !=, <, >, <=, >= — standard operators',
      'AND / OR / NOT — combine conditions; use parentheses for clarity',
      'BETWEEN a AND b — inclusive range; equivalent to col >= a AND col <= b',
      'IN (v1, v2, v3) — match any value in list; NOT IN excludes',
      'LIKE: % matches any sequence of chars; _ matches exactly one char',
      'ILIKE: case-insensitive LIKE (PostgreSQL) — ILIKE \'%alice%\'',
      'IS NULL / IS NOT NULL — correct way to check for NULL (= NULL is always false)',
      'SIMILAR TO and regex: col ~ \'^[A-Z]\' (PostgreSQL regex match)',
    ],
    codeExample: `-- Comparison
SELECT * FROM employees WHERE salary > 60000;

-- AND / OR
SELECT * FROM orders
WHERE status = 'pending'
  AND total > 100
  AND created_at >= '2025-01-01';

-- BETWEEN (inclusive)
SELECT * FROM products WHERE price BETWEEN 10.00 AND 50.00;

-- IN
SELECT * FROM employees
WHERE department IN ('Engineering', 'Product', 'Design');

-- LIKE / ILIKE (PostgreSQL)
SELECT * FROM users WHERE email ILIKE '%@gmail.com';
SELECT * FROM products WHERE name LIKE 'Mac%';  -- starts with Mac

-- NULL checks
SELECT * FROM employees WHERE phone_number IS NULL;
SELECT * FROM orders WHERE coupon_code IS NOT NULL;`,
    resources: ['PostgreSQL WHERE Clause', 'SQL Operators Reference'],
  },
  {
    id: 'aggregate-functions',
    title: 'Aggregate Functions & GROUP BY',
    category: 'dml',
    level: 'intermediate',
    estimatedHours: 3,
    description: 'COUNT, SUM, AVG, MIN, MAX — aggregate data with GROUP BY and filter groups with HAVING',
    keyPoints: [
      'COUNT(*): counts all rows; COUNT(col): counts non-NULL values in column',
      'SUM(col), AVG(col), MIN(col), MAX(col) — ignore NULL values',
      'GROUP BY groups rows with the same value — required when mixing aggregates and non-aggregate columns',
      'HAVING: filters groups (like WHERE but for aggregated results)',
      'WHERE filters rows BEFORE grouping; HAVING filters AFTER grouping',
      'COUNT(DISTINCT col): count unique values',
      'FILTER clause (PostgreSQL): aggregate with a condition — SUM(salary) FILTER (WHERE dept = \'Eng\')',
      'Grouping by multiple columns creates one group per unique combination',
    ],
    codeExample: `-- Basic aggregates
SELECT
    COUNT(*)                        AS total_employees,
    AVG(salary)                     AS avg_salary,
    MAX(salary)                     AS max_salary,
    MIN(salary)                     AS min_salary,
    SUM(salary)                     AS payroll
FROM employees
WHERE is_active = TRUE;

-- GROUP BY: stats per department
SELECT
    department,
    COUNT(*)        AS headcount,
    AVG(salary)     AS avg_salary,
    SUM(salary)     AS dept_payroll
FROM employees
GROUP BY department
ORDER BY dept_payroll DESC;

-- HAVING: only departments with avg salary > 80k
SELECT department, AVG(salary) AS avg_sal
FROM employees
GROUP BY department
HAVING AVG(salary) > 80000;

-- COUNT DISTINCT
SELECT COUNT(DISTINCT user_id) AS unique_buyers FROM orders;`,
    resources: ['PostgreSQL Aggregate Functions', 'GROUP BY Tutorial'],
  },
  {
    id: 'insert-update-delete',
    title: 'INSERT, UPDATE, DELETE',
    category: 'dml',
    level: 'beginner',
    estimatedHours: 3,
    description: 'Write data with INSERT, modify with UPDATE, and remove with DELETE — safely',
    keyPoints: [
      'INSERT INTO table (cols) VALUES (vals) — specify columns explicitly, don\'t rely on column order',
      'INSERT multiple rows: VALUES (row1), (row2), (row3) — much faster than individual inserts',
      'INSERT ... SELECT: copy data from another table',
      'ON CONFLICT DO UPDATE (upsert in PostgreSQL) — insert or update if unique constraint conflicts',
      'UPDATE always use WHERE — UPDATE without WHERE modifies every row (dangerous!)',
      'RETURNING clause: returns modified rows — useful for getting generated IDs',
      'DELETE always use WHERE; DELETE without WHERE clears the entire table (use TRUNCATE for that)',
      'Soft delete pattern: instead of DELETE, set is_deleted = TRUE and filter in queries',
    ],
    codeExample: `-- INSERT with explicit columns
INSERT INTO users (name, email, created_at)
VALUES ('Alice', 'alice@example.com', NOW());

-- INSERT multiple rows
INSERT INTO products (name, price) VALUES
    ('Widget', 9.99),
    ('Gadget', 19.99),
    ('Doohickey', 4.99);

-- UPSERT (INSERT or UPDATE on conflict)
INSERT INTO user_preferences (user_id, theme)
VALUES (1, 'dark')
ON CONFLICT (user_id) DO UPDATE
    SET theme = EXCLUDED.theme,
        updated_at = NOW();

-- UPDATE with RETURNING
UPDATE orders
SET status = 'shipped', shipped_at = NOW()
WHERE id = 42
RETURNING id, status, shipped_at;

-- DELETE
DELETE FROM sessions WHERE expires_at < NOW();

-- Soft delete
UPDATE users SET is_deleted = TRUE, deleted_at = NOW() WHERE id = 5;`,
    resources: ['PostgreSQL INSERT', 'PostgreSQL UPDATE', 'Upsert patterns'],
  },

  // JOINS
  {
    id: 'inner-join',
    title: 'INNER JOIN',
    category: 'joins',
    level: 'beginner',
    estimatedHours: 2,
    description: 'Return only matching rows from both tables — the most common join type',
    keyPoints: [
      'INNER JOIN returns rows where the join condition matches in BOTH tables',
      'Rows from either table without a match are excluded from the result',
      'JOIN condition specified with ON clause: ON orders.user_id = users.id',
      'Multiple joins: chain them — users JOIN orders ON... JOIN products ON...',
      'Use table aliases to shorten queries: FROM users u JOIN orders o ON u.id = o.user_id',
      'Join on multiple conditions: ON a.col1 = b.col1 AND a.col2 = b.col2',
      'INNER JOIN is symmetric — left/right order doesn\'t affect which rows are returned (unlike OUTER)',
      'Performance: ensure the join columns are indexed — otherwise full table scans on both sides',
    ],
    codeExample: `-- Basic INNER JOIN
SELECT
    u.id,
    u.name,
    o.id          AS order_id,
    o.total,
    o.status
FROM users u
INNER JOIN orders o ON u.id = o.user_id;

-- Three-table join
SELECT
    u.name,
    o.id          AS order_id,
    p.name        AS product_name,
    oi.quantity,
    oi.price
FROM users u
JOIN orders o    ON u.id = o.user_id
JOIN order_items oi ON o.id = oi.order_id
JOIN products p  ON oi.product_id = p.id
WHERE o.status = 'paid'
ORDER BY o.created_at DESC;`,
    resources: ['Visual JOIN Guide', 'PostgreSQL JOIN Types'],
  },
  {
    id: 'left-right-join',
    title: 'LEFT JOIN & RIGHT JOIN',
    category: 'joins',
    level: 'intermediate',
    estimatedHours: 2,
    description: 'Keep all rows from one side — LEFT JOIN is the most useful outer join',
    keyPoints: [
      'LEFT JOIN: returns ALL rows from the left table, with matching right-table data (NULL if no match)',
      'RIGHT JOIN: opposite — all rows from right, NULL for unmatched left (can always be rewritten as LEFT)',
      'Unmatched rows show NULL in all right-side columns',
      'Finding orphans: LEFT JOIN + WHERE right.id IS NULL — rows in left with no matching right rows',
      'LEFT JOIN is the go-to for "get all X and optionally their Y" queries',
      'Order of tables matters: users LEFT JOIN orders = all users, even those with no orders',
      'Avoid accidental CROSS JOIN: always specify an ON condition in OUTER JOINs',
      'RIGHT JOIN is rarely used — swap table order and use LEFT JOIN for clarity',
    ],
    codeExample: `-- LEFT JOIN: all users, even those with no orders
SELECT
    u.id,
    u.name,
    COUNT(o.id)   AS order_count,
    SUM(o.total)  AS total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name
ORDER BY total_spent DESC NULLS LAST;

-- Find users who have NEVER placed an order
SELECT u.id, u.name, u.email
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.id IS NULL;   -- unmatched rows have NULL on right side

-- Products never ordered
SELECT p.id, p.name
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
WHERE oi.product_id IS NULL;`,
    resources: ['LEFT JOIN visual guide', 'Finding missing relationships'],
  },
  {
    id: 'full-outer-self-cross',
    title: 'FULL OUTER JOIN, Self Join & Cross Join',
    category: 'joins',
    level: 'intermediate',
    estimatedHours: 3,
    description: 'Complete the join family — FULL OUTER for all rows, Self for hierarchies, Cross for combinations',
    keyPoints: [
      'FULL OUTER JOIN: returns all rows from both tables — NULL where no match on either side',
      'Useful for reconciliation: find rows in A not in B AND rows in B not in A',
      'Self join: join a table to itself — requires aliases; use for hierarchies (employee-manager)',
      'Cross join: Cartesian product — every row of A × every row of B; m × n total rows',
      'Cross join use case: generating all combinations (size × color for product variants)',
      'Be careful with cross joins on large tables — m=10k × n=10k = 100M rows',
      'FULL OUTER JOIN can be simulated with LEFT JOIN UNION ALL RIGHT JOIN WHERE left.id IS NULL',
      'Self join key: each alias represents a different "role" of the same table',
    ],
    codeExample: `-- FULL OUTER JOIN: all customers and all employees (find unmatched)
SELECT
    c.name AS customer,
    e.name AS employee
FROM customers c
FULL OUTER JOIN employees e ON c.assigned_rep_id = e.id;

-- Self Join: employee and their manager
SELECT
    e.name    AS employee,
    m.name    AS manager,
    e.salary
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id  -- e and m are same table
ORDER BY m.name, e.name;

-- Cross Join: generate all size/color combinations
SELECT s.size_name, c.color_name
FROM sizes s
CROSS JOIN colors c
ORDER BY s.size_name, c.color_name;
-- (5 sizes × 8 colors = 40 product variant combinations)`,
    resources: ['SQL Join Types Explained', 'Self Join use cases'],
  },

  // SUBQUERIES
  {
    id: 'scalar-subqueries',
    title: 'Scalar & Inline Subqueries',
    category: 'subqueries',
    level: 'intermediate',
    estimatedHours: 2,
    description: 'Use subqueries in SELECT, WHERE, and FROM — scalar (single value) and derived table patterns',
    keyPoints: [
      'Subquery: a SELECT nested inside another SQL statement',
      'Scalar subquery: returns a single value — used in SELECT list or WHERE comparison',
      'Derived table / inline view: subquery in FROM clause — treated as a temporary table',
      'Subquery in SELECT: adds calculated column from related table',
      'Subquery in WHERE: filter based on another query\'s result',
      'IN with subquery: WHERE user_id IN (SELECT id FROM users WHERE role = \'admin\')',
      'ALL / ANY: compare against all/any values from a subquery',
      'Prefer JOINs over subqueries for performance when possible — easier for optimizer',
    ],
    codeExample: `-- Scalar subquery in SELECT
SELECT
    p.name,
    p.price,
    (SELECT AVG(price) FROM products) AS avg_price,
    p.price - (SELECT AVG(price) FROM products) AS diff_from_avg
FROM products p;

-- Subquery in WHERE
SELECT name, email
FROM users
WHERE id IN (
    SELECT DISTINCT user_id
    FROM orders
    WHERE total > 500 AND status = 'paid'
);

-- Derived table (subquery in FROM)
SELECT dept, avg_sal
FROM (
    SELECT department AS dept, AVG(salary) AS avg_sal
    FROM employees
    GROUP BY department
) dept_averages
WHERE avg_sal > 70000;`,
    resources: ['PostgreSQL Subqueries', 'Subquery vs JOIN performance'],
  },
  {
    id: 'correlated-exists',
    title: 'Correlated Subqueries & EXISTS',
    category: 'subqueries',
    level: 'advanced',
    estimatedHours: 3,
    description: 'Subqueries that reference the outer query — and EXISTS for efficient existence checks',
    keyPoints: [
      'Correlated subquery: references a column from the outer query — runs once per outer row',
      'Performance note: correlated subqueries run N times — often rewriteable as a JOIN',
      'EXISTS: returns TRUE if subquery returns any row — more efficient than IN for large datasets',
      'NOT EXISTS: elegant way to find rows with no related records',
      'EXISTS short-circuits — stops scanning as soon as it finds one matching row',
      'IN vs EXISTS: IN materializes all values; EXISTS stops at first match — EXISTS often faster',
      'Use correlated subqueries for row-level calculations that reference outer context',
      'A JOIN is usually more efficient than a correlated subquery — but both have their place',
    ],
    codeExample: `-- Correlated subquery: employees earning above dept average
SELECT e.name, e.department, e.salary
FROM employees e
WHERE e.salary > (
    SELECT AVG(salary)
    FROM employees dept_avg
    WHERE dept_avg.department = e.department  -- references outer query's e.department
);

-- EXISTS: users who have at least one paid order
SELECT u.id, u.name
FROM users u
WHERE EXISTS (
    SELECT 1 FROM orders o
    WHERE o.user_id = u.id AND o.status = 'paid'
);

-- NOT EXISTS: users with no orders at all
SELECT u.id, u.name
FROM users u
WHERE NOT EXISTS (
    SELECT 1 FROM orders o WHERE o.user_id = u.id
);

-- Equivalent (usually faster) as LEFT JOIN + IS NULL:
SELECT u.id, u.name
FROM users u LEFT JOIN orders o ON u.id = o.user_id
WHERE o.id IS NULL;`,
    resources: ['EXISTS vs IN performance', 'Correlated Subquery Guide'],
  },

  // FUNCTIONS
  {
    id: 'string-functions',
    title: 'String Functions',
    category: 'functions',
    level: 'intermediate',
    estimatedHours: 3,
    description: 'Manipulate text data with CONCAT, SUBSTRING, REPLACE, TRIM, REGEXP, and more',
    keyPoints: [
      'CONCAT(a, b) or a || b — concatenate strings; CONCAT handles NULLs (returns empty), || propagates NULL',
      'LENGTH(str) — character count; CHAR_LENGTH — Unicode aware',
      'UPPER(str) / LOWER(str) — case conversion',
      'TRIM(str) / LTRIM / RTRIM — remove whitespace; TRIM(BOTH \'x\' FROM str) trims specific char',
      'SUBSTRING(str, start, length) — extract substring; also: LEFT(str, n), RIGHT(str, n)',
      'REPLACE(str, from, to) — replace all occurrences',
      'POSITION(sub IN str) or STRPOS(str, sub) — find substring position (1-based, 0 if not found)',
      'REGEXP_REPLACE / REGEXP_MATCHES — regex operations; ~ for regex match in WHERE',
    ],
    codeExample: `-- Basic string operations
SELECT
    UPPER('hello world'),                    -- HELLO WORLD
    LOWER('ALICE'),                          -- alice
    LENGTH('database'),                      -- 8
    TRIM('  hello  '),                       -- 'hello'
    LTRIM('   left'),                        -- 'left'
    SUBSTRING('PostgreSQL', 1, 4),           -- Post
    LEFT('PostgreSQL', 4),                   -- Post
    RIGHT('PostgreSQL', 3),                  -- SQL
    REPLACE('hello world', 'world', 'SQL'),  -- hello SQL
    POSITION('SQL' IN 'PostgreSQL'),         -- 8
    CONCAT(first_name, ' ', last_name)       -- full name
FROM (VALUES ('')) t;

-- Real use case: normalize and clean email
UPDATE users
SET email = LOWER(TRIM(email))
WHERE email != LOWER(TRIM(email));

-- Regex match (PostgreSQL)
SELECT * FROM users WHERE email ~ '^[a-z0-9.]+@[a-z]+\\.com$';`,
    resources: ['PostgreSQL String Functions', 'PostgreSQL Regex'],
  },
  {
    id: 'date-functions',
    title: 'Date & Time Functions',
    category: 'functions',
    level: 'intermediate',
    estimatedHours: 3,
    description: 'Extract, truncate, and calculate with dates — age, intervals, and timezone handling',
    keyPoints: [
      'NOW() / CURRENT_TIMESTAMP — current date+time with timezone; CURRENT_DATE — date only',
      'DATE_PART(\'year\', ts) / EXTRACT(YEAR FROM ts) — extract components (year, month, day, hour, ...)',
      'DATE_TRUNC(\'month\', ts) — truncate to month start — useful for grouping by period',
      'Interval arithmetic: NOW() - INTERVAL \'7 days\'; created_at + INTERVAL \'1 year\'',
      'AGE(ts) — human-readable difference from now; AGE(ts1, ts2) — between two timestamps',
      'TO_CHAR(ts, \'YYYY-MM-DD HH24:MI\') — format timestamp as string',
      'AT TIME ZONE \'UTC\' — convert timezone; always store as TIMESTAMPTZ',
      'BETWEEN for date ranges: created_at BETWEEN \'2025-01-01\' AND \'2025-12-31\'',
    ],
    codeExample: `-- Current date/time
SELECT NOW(), CURRENT_DATE, CURRENT_TIME;

-- Extract parts
SELECT
    EXTRACT(YEAR FROM NOW())  AS year,
    EXTRACT(MONTH FROM NOW()) AS month,
    EXTRACT(DOW FROM NOW())   AS day_of_week;  -- 0=Sunday

-- Date truncation for grouping
SELECT
    DATE_TRUNC('month', created_at) AS month,
    COUNT(*)                         AS orders,
    SUM(total)                       AS revenue
FROM orders
GROUP BY DATE_TRUNC('month', created_at)
ORDER BY month;

-- Age and intervals
SELECT
    name,
    AGE(hire_date) AS tenure,
    hire_date + INTERVAL '90 days' AS probation_end
FROM employees;

-- Filter last 30 days
SELECT * FROM events WHERE created_at >= NOW() - INTERVAL '30 days';

-- Format for display
SELECT TO_CHAR(created_at, 'Mon DD, YYYY HH12:MI AM') FROM orders;`,
    resources: ['PostgreSQL Date/Time Functions', 'Time Zone Handling in PostgreSQL'],
  },
  {
    id: 'case-coalesce',
    title: 'CASE, COALESCE & Conditional Expressions',
    category: 'functions',
    level: 'intermediate',
    estimatedHours: 2,
    description: 'Conditional logic in SQL — CASE WHEN, COALESCE for NULLs, NULLIF',
    keyPoints: [
      'CASE WHEN condition THEN result [ELSE default] END — SQL\'s if-else',
      'Searched CASE: CASE WHEN col > 100 THEN \'high\' ELSE \'low\' END',
      'Simple CASE: CASE col WHEN 1 THEN \'one\' WHEN 2 THEN \'two\' END',
      'COALESCE(a, b, c): returns first non-NULL value — great for providing defaults',
      'NULLIF(a, b): returns NULL if a = b, otherwise returns a — useful to avoid division by zero',
      'Use CASE in ORDER BY: ORDER BY CASE WHEN status = \'urgent\' THEN 0 ELSE 1 END',
      'CASE in aggregate: COUNT(CASE WHEN status = \'paid\' THEN 1 END) — conditional count',
      'GREATEST(a,b) / LEAST(a,b) — return max/min of a list of values',
    ],
    codeExample: `-- CASE for bucketing
SELECT
    name,
    salary,
    CASE
        WHEN salary < 50000  THEN 'Junior'
        WHEN salary < 100000 THEN 'Mid-Level'
        WHEN salary < 150000 THEN 'Senior'
        ELSE                      'Principal'
    END AS level
FROM employees;

-- COALESCE: null-safe display
SELECT
    name,
    COALESCE(phone, email, 'No contact info') AS contact
FROM users;

-- NULLIF: prevent division by zero
SELECT
    product,
    sales / NULLIF(returns, 0) AS sales_per_return
FROM sales_data;

-- Conditional aggregate (pivot-style)
SELECT
    DATE_TRUNC('month', created_at) AS month,
    COUNT(*)                         AS total_orders,
    COUNT(CASE WHEN status = 'paid'      THEN 1 END) AS paid,
    COUNT(CASE WHEN status = 'cancelled' THEN 1 END) AS cancelled
FROM orders GROUP BY 1 ORDER BY 1;`,
    resources: ['PostgreSQL Conditional Expressions', 'CASE WHEN Tutorial'],
  },

  // VIEWS & INDEXES
  {
    id: 'views',
    title: 'Views & Materialized Views',
    category: 'views-indexes',
    level: 'intermediate',
    estimatedHours: 3,
    description: 'Encapsulate complex queries in views; use materialized views for pre-computed results',
    keyPoints: [
      'VIEW: a named query stored in the DB — reusable, can simplify complex SQL for users',
      'Views don\'t store data — they run the underlying query every time they are accessed',
      'Updatable views: simple views on one table can accept INSERT/UPDATE/DELETE',
      'CREATE OR REPLACE VIEW — update view definition without dropping it',
      'Materialized view: stores the query result physically — much faster reads, but data may be stale',
      'REFRESH MATERIALIZED VIEW — manually update materialized view data (or schedule it)',
      'REFRESH MATERIALIZED VIEW CONCURRENTLY — refreshes without locking reads (requires unique index)',
      'Use materialized views for expensive reports/dashboards that can tolerate slight staleness',
    ],
    codeExample: `-- Regular view (runs query each time)
CREATE OR REPLACE VIEW active_user_stats AS
SELECT
    u.id,
    u.name,
    u.email,
    COUNT(o.id)  AS order_count,
    SUM(o.total) AS lifetime_value
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.is_active = TRUE
GROUP BY u.id, u.name, u.email;

-- Use like a table
SELECT * FROM active_user_stats WHERE lifetime_value > 1000;

-- Materialized view (stored, fast, but needs refresh)
CREATE MATERIALIZED VIEW monthly_revenue AS
SELECT
    DATE_TRUNC('month', created_at) AS month,
    SUM(total) AS revenue
FROM orders WHERE status = 'paid'
GROUP BY 1;

CREATE UNIQUE INDEX ON monthly_revenue(month);  -- required for CONCURRENTLY

-- Refresh (run nightly via cron)
REFRESH MATERIALIZED VIEW CONCURRENTLY monthly_revenue;

SELECT * FROM monthly_revenue ORDER BY month DESC LIMIT 12;`,
    resources: ['PostgreSQL Views', 'Materialized Views guide'],
  },
  {
    id: 'indexes',
    title: 'Indexes',
    category: 'views-indexes',
    level: 'intermediate',
    estimatedHours: 4,
    description: 'Speed up queries with B-tree, composite, partial, and expression indexes',
    keyPoints: [
      'Index: data structure that speeds up lookups at the cost of storage and write overhead',
      'B-tree (default): handles =, <, >, BETWEEN, LIKE \'prefix%\' — good for most use cases',
      'Composite index: index on multiple columns — column order matters (leftmost prefix rule)',
      'Partial index: index only a subset of rows — smaller, faster: CREATE INDEX ON orders(user_id) WHERE status = \'pending\'',
      'Expression index: index on a function — CREATE INDEX ON users(LOWER(email))',
      'Covering index (INCLUDE): includes extra columns in index to avoid heap access',
      'When NOT to index: small tables, columns with low cardinality (boolean), write-heavy tables',
      'Use EXPLAIN ANALYZE to verify index is being used — look for "Index Scan" not "Seq Scan"',
    ],
    codeExample: `-- Basic index (B-tree)
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_users_email    ON users(email);

-- Composite index (leftmost prefix: user_id alone or user_id+status)
CREATE INDEX idx_orders_user_status
    ON orders(user_id, status);

-- Partial index (only pending orders — smaller, faster)
CREATE INDEX idx_pending_orders
    ON orders(user_id, created_at)
    WHERE status = 'pending';

-- Expression index for case-insensitive email lookup
CREATE INDEX idx_users_email_lower
    ON users(LOWER(email));

-- Query that uses it:
SELECT * FROM users WHERE LOWER(email) = 'alice@example.com';

-- Covering index (include avoids extra heap fetch)
CREATE INDEX idx_orders_cover
    ON orders(user_id)
    INCLUDE (total, status, created_at);

-- Check if query uses the index
EXPLAIN ANALYZE
SELECT * FROM orders WHERE user_id = 42 AND status = 'paid';`,
    resources: ['PostgreSQL Index Types', 'Use the Index Luke', 'EXPLAIN ANALYZE Guide'],
  },

  // TRANSACTIONS
  {
    id: 'acid',
    title: 'ACID Properties',
    category: 'transactions',
    level: 'intermediate',
    estimatedHours: 3,
    description: 'Atomicity, Consistency, Isolation, Durability — the guarantees that make databases reliable',
    keyPoints: [
      'Atomicity: a transaction is all-or-nothing — if any part fails, the whole transaction rolls back',
      'Consistency: transaction brings DB from one valid state to another — all constraints still hold',
      'Isolation: concurrent transactions do not interfere — behave as if sequential',
      'Durability: committed transactions survive system crashes — written to persistent storage (WAL)',
      'Classic example: bank transfer — debit A AND credit B must both succeed or both fail',
      'Without ACID: partial writes, dirty reads, lost updates, phantom rows',
      'BASE (NoSQL alternative): Basically Available, Soft state, Eventually consistent — trades ACID for scale',
      'PostgreSQL is fully ACID-compliant; some NoSQL stores relax isolation for performance',
    ],
    codeExample: `-- Atomicity: bank transfer — both updates must succeed
BEGIN;

UPDATE accounts SET balance = balance - 500 WHERE id = 1;  -- debit Alice
UPDATE accounts SET balance = balance + 500 WHERE id = 2;  -- credit Bob

-- If any statement fails, ROLLBACK is called automatically
-- Both updates succeed → COMMIT
COMMIT;

-- Manual rollback on error
BEGIN;
UPDATE inventory SET quantity = quantity - 1 WHERE product_id = 5;

-- Check constraint after update
DO $$
BEGIN
    IF (SELECT quantity FROM inventory WHERE product_id = 5) < 0 THEN
        RAISE EXCEPTION 'Insufficient stock';
    END IF;
END $$;

COMMIT;  -- only reaches here if no exception`,
    resources: ['ACID Properties Explained', 'PostgreSQL Transaction Docs'],
  },
  {
    id: 'isolation-levels',
    title: 'Transaction Isolation Levels',
    category: 'transactions',
    level: 'advanced',
    estimatedHours: 3,
    description: 'Read Committed, Repeatable Read, Serializable — controlling what concurrent transactions see',
    keyPoints: [
      'Read Uncommitted: can read uncommitted changes from other transactions (dirty reads) — NOT supported in PostgreSQL',
      'Read Committed (PostgreSQL default): only sees committed data — no dirty reads, but non-repeatable reads possible',
      'Repeatable Read: same query returns same result within transaction — no non-repeatable reads',
      'Serializable: strongest isolation — transactions behave as if executed sequentially, no anomalies',
      'Dirty read: reading uncommitted data that might be rolled back',
      'Non-repeatable read: same query returns different rows in same transaction (another TX committed between reads)',
      'Phantom read: new rows appear between reads in same transaction (another TX inserted)',
      'Higher isolation = safer but slower (more locking/conflict detection)',
    ],
    codeExample: `-- Set isolation level for a transaction
BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ;

-- Any SELECT in this transaction sees a consistent snapshot
-- even if other transactions commit changes between selects
SELECT COUNT(*) FROM orders WHERE status = 'pending';
-- ... do some work ...
SELECT COUNT(*) FROM orders WHERE status = 'pending';  -- same count guaranteed
COMMIT;

-- SERIALIZABLE: strongest — use for financial operations
BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;

-- Read balance
SELECT balance FROM accounts WHERE id = 1;  -- 1000

-- Decide based on balance
-- If concurrent TX also read and updated, PostgreSQL detects
-- the serialization conflict and aborts one of the transactions
UPDATE accounts SET balance = balance - 500 WHERE id = 1;

COMMIT;  -- May fail with "could not serialize access" — retry in app code

-- Check current isolation level
SHOW transaction_isolation;`,
    resources: ['PostgreSQL Transaction Isolation', 'Isolation Level Comparison', 'Jepsen on isolation'],
  },

  // SECURITY
  {
    id: 'grant-revoke',
    title: 'GRANT, REVOKE & Row-Level Security',
    category: 'security',
    level: 'intermediate',
    estimatedHours: 3,
    description: 'Control database access with privileges, roles, and row-level security policies',
    keyPoints: [
      'GRANT SELECT, INSERT ON table TO user — give specific privileges',
      'REVOKE GRANT OPTION FOR ... — remove a privilege',
      'Roles: CREATE ROLE app_read; GRANT SELECT ON ALL TABLES TO app_read',
      'Principle of least privilege: app user should have only the privileges it needs',
      'Row-Level Security (RLS): policies that filter rows based on current user context',
      'ENABLE ROW LEVEL SECURITY on table + CREATE POLICY — per-row access control',
      'Separate DB users: one for app (SELECT/INSERT/UPDATE/DELETE), one for migrations (DDL)',
      'Never use the postgres superuser in application code',
    ],
    codeExample: `-- Create roles
CREATE ROLE app_readonly;
CREATE ROLE app_readwrite;

-- Grant privileges
GRANT CONNECT ON DATABASE mydb TO app_readonly;
GRANT USAGE ON SCHEMA public TO app_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_readonly;

GRANT app_readonly TO app_readwrite;  -- inherit read privileges
GRANT INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_readwrite;

-- Create app user
CREATE USER api_user WITH PASSWORD 'secure_password';
GRANT app_readwrite TO api_user;

-- Row-Level Security: users can only see their own data
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY user_orders_policy ON orders
    USING (user_id = current_setting('app.current_user_id')::INTEGER);

-- In app: SET LOCAL app.current_user_id = '42' before queries
BEGIN;
SET LOCAL app.current_user_id = '42';
SELECT * FROM orders;  -- only returns rows where user_id = 42
COMMIT;`,
    resources: ['PostgreSQL Privileges', 'Row Level Security', 'PostgreSQL Roles'],
  },
  {
    id: 'sql-injection',
    title: 'Preventing SQL Injection',
    category: 'security',
    level: 'intermediate',
    estimatedHours: 2,
    description: 'Parameterized queries — the single most important SQL security practice',
    keyPoints: [
      'SQL injection: attacker inserts SQL code into user input that gets executed by the database',
      'Never build SQL strings with string concatenation or f-strings from user input',
      'Parameterized queries (prepared statements): DB driver escapes values separately from SQL logic',
      'ORMs (SQLAlchemy, Django ORM) use parameterized queries by default — use them',
      'Even with ORM, be careful with .raw() / .extra() / text() — still need parameters',
      'Use LIKE with parameters: LIKE %s not LIKE \'%\' + user_input + \'%\'',
      'Stored procedures do NOT automatically prevent injection — dynamic SQL inside procs is still risky',
      'Regular audits: search codebase for cursor.execute(f"...", dangerous pattern',
    ],
    codeExample: `import psycopg2

# WRONG — SQL injection vulnerable
user_id = request.args.get('id')
cursor.execute(f"SELECT * FROM users WHERE id = {user_id}")
# Attacker sends: id=1 OR 1=1 → returns ALL users

# CORRECT — parameterized query
cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))

# CORRECT — multiple parameters
cursor.execute(
    "SELECT * FROM orders WHERE user_id = %s AND status = %s",
    (user_id, status)
)

# SQLAlchemy ORM (safe by default)
from sqlalchemy import select
stmt = select(User).where(User.id == user_id)  # parameterized automatically

# SQLAlchemy with text() — still use bindparams
from sqlalchemy import text
stmt = text("SELECT * FROM users WHERE email = :email")
result = db.execute(stmt, {'email': email})  # safe

# Django ORM (safe by default)
User.objects.filter(id=user_id)  # parameterized
User.objects.raw('SELECT * FROM users WHERE id = %s', [user_id])  # safe`,
    resources: ['OWASP SQL Injection', 'psycopg2 parameterized queries', 'SQLAlchemy security'],
  },

  // PERFORMANCE
  {
    id: 'explain-analyze',
    title: 'EXPLAIN & EXPLAIN ANALYZE',
    category: 'performance',
    level: 'advanced',
    estimatedHours: 4,
    description: 'Read query execution plans to identify bottlenecks — the essential query tuning tool',
    keyPoints: [
      'EXPLAIN: shows query plan without running the query — estimated costs and row counts',
      'EXPLAIN ANALYZE: runs the query and shows actual timing and row counts vs estimates',
      'Seq Scan: full table scan — slow on large tables; look for this to add indexes',
      'Index Scan: uses an index — fast; Index Only Scan even better (reads from index alone)',
      'Hash Join / Nested Loop / Merge Join — different join strategies chosen by planner',
      'Cost: (startup_cost..total_cost) — planner\'s estimate in arbitrary units; lower is better',
      'rows= vs actual rows= — large mismatch means stale statistics; run ANALYZE',
      'Use explain.depesz.com or pgMustard to visualize EXPLAIN ANALYZE output',
    ],
    codeExample: `-- EXPLAIN: see plan without running
EXPLAIN
SELECT u.name, COUNT(o.id)
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE o.status = 'paid'
GROUP BY u.name;

-- EXPLAIN ANALYZE: run + show actual timing
EXPLAIN (ANALYZE, BUFFERS, FORMAT TEXT)
SELECT * FROM orders
WHERE user_id = 42 AND status = 'pending'
ORDER BY created_at DESC
LIMIT 10;

-- Sample output interpretation:
-- Index Scan using idx_orders_user_status on orders (cost=0.43..8.47 rows=3 width=120)
--                                                    (actual time=0.023..0.031 rows=3 loops=1)
--   Index Cond: ((user_id = 42) AND (status = 'pending'))
-- Planning Time: 0.5 ms
-- Execution Time: 0.1 ms   <- good!

-- If you see Seq Scan on large table, add an index:
CREATE INDEX idx_orders_user_status ON orders(user_id, status);

-- Force planner to use index (rarely needed, for debugging):
SET enable_seqscan = OFF;
EXPLAIN SELECT * FROM users WHERE email = 'alice@example.com';
SET enable_seqscan = ON;  -- reset after`,
    resources: ['PostgreSQL EXPLAIN', 'explain.depesz.com', 'pgMustard'],
  },

  // ADVANCED SQL
  {
    id: 'window-functions',
    title: 'Window Functions',
    category: 'advanced',
    level: 'advanced',
    estimatedHours: 5,
    description: 'ROW_NUMBER, RANK, LAG, LEAD, running totals — calculations across related rows without grouping',
    keyPoints: [
      'Window functions operate on a "window" of rows related to the current row — unlike GROUP BY, they don\'t collapse rows',
      'Syntax: function() OVER (PARTITION BY col ORDER BY col ROWS/RANGE frame)',
      'PARTITION BY: divides rows into groups (like GROUP BY but keeps all rows)',
      'ROW_NUMBER(): unique sequential number; RANK(): with gaps; DENSE_RANK(): no gaps',
      'LAG(col, n): value from n rows before; LEAD(col, n): value from n rows ahead',
      'FIRST_VALUE / LAST_VALUE: first/last value in the window frame',
      'Running total: SUM(amount) OVER (ORDER BY date) — cumulative sum',
      'NTILE(n): divide rows into n equal buckets (useful for percentile grouping)',
    ],
    codeExample: `-- ROW_NUMBER: rank employees by salary within each department
SELECT
    name,
    department,
    salary,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rank_in_dept
FROM employees;

-- RANK vs DENSE_RANK (with ties)
SELECT
    name,
    salary,
    RANK()       OVER (ORDER BY salary DESC) AS rank,       -- gaps on ties
    DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank  -- no gaps
FROM employees;

-- Running total and moving average
SELECT
    order_date,
    daily_revenue,
    SUM(daily_revenue)  OVER (ORDER BY order_date) AS running_total,
    AVG(daily_revenue)  OVER (ORDER BY order_date ROWS 6 PRECEDING) AS rolling_7d_avg
FROM daily_sales;

-- LAG/LEAD: month-over-month growth
SELECT
    month,
    revenue,
    LAG(revenue)  OVER (ORDER BY month) AS prev_month_revenue,
    revenue - LAG(revenue) OVER (ORDER BY month) AS mom_change
FROM monthly_revenue;

-- Top 3 products per category
SELECT * FROM (
    SELECT
        category, name, sales,
        RANK() OVER (PARTITION BY category ORDER BY sales DESC) AS rnk
    FROM products
) ranked
WHERE rnk <= 3;`,
    resources: ['PostgreSQL Window Functions', 'Mode Analytics Window Function Guide'],
  },
  {
    id: 'cte',
    title: 'CTEs (Common Table Expressions)',
    category: 'advanced',
    level: 'intermediate',
    estimatedHours: 3,
    description: 'WITH clause — named temporary result sets for readable, reusable SQL',
    keyPoints: [
      'CTE: WITH name AS (SELECT ...) — gives a name to a subquery for reuse in the same query',
      'Multiple CTEs: WITH a AS (...), b AS (...) SELECT ... — chain multiple named queries',
      'CTEs improve readability — break complex queries into logical steps',
      'PostgreSQL: CTEs are optimization fences by default — use WITH MATERIALIZED / NOT MATERIALIZED to control',
      'Recursive CTE: WITH RECURSIVE — for hierarchical/graph data (org trees, BFS/DFS)',
      'CTE vs derived table: CTE can be referenced multiple times; derived table is inline once',
      'CTE vs temp table: CTE is query-scoped; temp table persists for the session',
      'Use CTEs for multi-step transformations, intermediate aggregations, and readability',
    ],
    codeExample: `-- Basic CTE: break a complex query into steps
WITH
  paid_orders AS (
      SELECT user_id, SUM(total) AS total_spent
      FROM orders
      WHERE status = 'paid'
      GROUP BY user_id
  ),
  high_value AS (
      SELECT user_id
      FROM paid_orders
      WHERE total_spent > 1000
  )
SELECT u.name, u.email, po.total_spent
FROM users u
JOIN paid_orders po ON u.id = po.user_id
WHERE u.id IN (SELECT user_id FROM high_value);

-- Recursive CTE: employee hierarchy
WITH RECURSIVE org_chart AS (
    -- Anchor: top-level managers (no manager)
    SELECT id, name, manager_id, 0 AS level
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    -- Recursive: employees who report to previous level
    SELECT e.id, e.name, e.manager_id, oc.level + 1
    FROM employees e
    JOIN org_chart oc ON e.manager_id = oc.id
)
SELECT
    REPEAT('  ', level) || name AS org_structure,
    level
FROM org_chart
ORDER BY level, name;`,
    resources: ['PostgreSQL WITH Queries', 'Recursive CTE Guide'],
  },
  {
    id: 'stored-procedures',
    title: 'Stored Procedures & Functions (PL/pgSQL)',
    category: 'stored',
    level: 'advanced',
    estimatedHours: 4,
    description: 'Write procedural SQL with PL/pgSQL — functions, procedures, and triggers',
    keyPoints: [
      'CREATE FUNCTION: returns a value; can be used in SELECT; supports RETURNS SETOF for multiple rows',
      'CREATE PROCEDURE (PostgreSQL 11+): for side effects; called with CALL; supports transaction control',
      'PL/pgSQL: procedural language with IF/ELSIF/ELSE, loops (LOOP, FOR, WHILE), variables, exceptions',
      'RETURNS TABLE: function returns multiple rows and columns — like an inline view',
      'Trigger function: special function returning TRIGGER — called automatically on INSERT/UPDATE/DELETE',
      'CREATE TRIGGER ... BEFORE/AFTER INSERT/UPDATE/DELETE ON table FOR EACH ROW EXECUTE FUNCTION ...',
      'Exception handling: BEGIN ... EXCEPTION WHEN others THEN ... END',
      'Dynamic SQL inside PL/pgSQL: EXECUTE \'SELECT ... \'|| quote_ident(table_name) — be careful with injection',
    ],
    codeExample: `-- Simple PL/pgSQL function
CREATE OR REPLACE FUNCTION get_user_order_count(p_user_id INTEGER)
RETURNS INTEGER AS $$
DECLARE
    v_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO v_count
    FROM orders
    WHERE user_id = p_user_id AND status = 'paid';
    RETURN v_count;
END;
$$ LANGUAGE plpgsql;

-- Usage
SELECT get_user_order_count(42);

-- Function returning a table
CREATE OR REPLACE FUNCTION top_customers(p_limit INTEGER DEFAULT 10)
RETURNS TABLE(user_id INT, name TEXT, total_spent DECIMAL) AS $$
BEGIN
    RETURN QUERY
    SELECT u.id, u.name, SUM(o.total)
    FROM users u JOIN orders o ON u.id = o.user_id
    WHERE o.status = 'paid'
    GROUP BY u.id, u.name
    ORDER BY SUM(o.total) DESC
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- Trigger: auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION set_updated_at();`,
    resources: ['PL/pgSQL Reference', 'PostgreSQL Triggers', 'Functions vs Procedures'],
  },
  {
    id: 'pivot-window-advanced',
    title: 'Pivot Tables & Advanced Aggregation',
    category: 'advanced',
    level: 'advanced',
    estimatedHours: 3,
    description: 'Transpose rows to columns with CASE-based pivots, CROSSTAB, ROLLUP, and CUBE',
    keyPoints: [
      'Pivot: transform row values into column headers — e.g., monthly sales as columns',
      'Manual pivot with CASE WHEN: portable across all SQL databases',
      'CROSSTAB (PostgreSQL tablefunc extension): cleaner pivot syntax',
      'ROLLUP: GROUP BY extension that adds subtotals — GROUP BY ROLLUP(year, month)',
      'CUBE: all possible combinations of GROUP BY columns including subtotals',
      'GROUPING SETS: explicitly list which groupings to compute',
      'GROUPING() function: returns 1 if column is aggregated in current row (used to distinguish subtotals)',
      'For dynamic pivots (columns unknown at query time), use application-layer code or crosstab with dynamic SQL',
    ],
    codeExample: `-- Manual pivot: monthly revenue as columns
SELECT
    product_name,
    SUM(CASE WHEN EXTRACT(MONTH FROM order_date) = 1  THEN revenue END) AS jan,
    SUM(CASE WHEN EXTRACT(MONTH FROM order_date) = 2  THEN revenue END) AS feb,
    SUM(CASE WHEN EXTRACT(MONTH FROM order_date) = 3  THEN revenue END) AS mar,
    SUM(revenue) AS total
FROM sales
GROUP BY product_name;

-- ROLLUP: subtotals per year and grand total
SELECT
    EXTRACT(YEAR FROM order_date)  AS year,
    EXTRACT(MONTH FROM order_date) AS month,
    SUM(total)                     AS revenue
FROM orders
GROUP BY ROLLUP(
    EXTRACT(YEAR FROM order_date),
    EXTRACT(MONTH FROM order_date)
)
ORDER BY year NULLS LAST, month NULLS LAST;
-- Rows: each (year,month) + each (year,NULL)=annual total + (NULL,NULL)=grand total

-- GROUPING SETS: custom aggregation groups
SELECT department, job_title, AVG(salary)
FROM employees
GROUP BY GROUPING SETS (
    (department, job_title),  -- by dept+title
    (department),             -- by dept only
    ()                        -- grand average
);`,
    resources: ['PostgreSQL GROUPING SETS', 'Pivot in PostgreSQL', 'ROLLUP and CUBE'],
  },
];