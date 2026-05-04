export const databaseInterview = {
  categories: ["Database"],
  questions: [
    // ─── 1. SQL FUNDAMENTALS ──────────────────────────────────────────────────
    {
      id: 301,
      category: "Database", difficulty: 1,
      topic: "1. SQL Fundamentals",
      question: "What is the difference between INNER, LEFT, and RIGHT JOIN?",
      simpleAnswer: "INNER returns only matching rows. LEFT returns everything from the left table plus matches. RIGHT returns everything from the right table plus matches.",
      explanation: "Think of a Venn diagram. INNER JOIN is the intersection. LEFT JOIN guarantees no records from your primary (left) table are lost, filling in NULLs if the right table has no match. This is crucial when you want to report on 'all users, even those without orders'.",
      analogy: "Think of two overlapping circles in a Venn diagram. INNER JOIN is only the overlapping middle — just the matches. LEFT JOIN is the entire left circle — all left-table rows, with NULLs where the right circle doesn't overlap. It's like a class roster (left) joined with exam scores (right) — every student appears, even those who didn't sit the exam.",
      example: "Users LEFT JOIN Orders: Shows every user. If a user hasn't bought anything, the Order columns will just be NULL.",
      followUps: [
        { question: "What is a FULL OUTER JOIN?", answer: "It returns everything from both tables, with NULLs where there are no matches on either side." }
      ],
      keyPoints: ["INNER: Intersection (matches only)", "LEFT: All left + matches", "RIGHT: All right + matches", "Missing matches return NULL"]
    },
    {
      id: 302,
      category: "Database", difficulty: 1,
      topic: "1. SQL Fundamentals",
      question: "What is the difference between WHERE and HAVING?",
      simpleAnswer: "WHERE filters individual rows BEFORE grouping. HAVING filters aggregated groups AFTER grouping happens.",
      explanation: "You cannot use aggregate functions (like COUNT or SUM) in a WHERE clause because the database evaluates WHERE row-by-row before doing any math. HAVING was created specifically to filter on those aggregated results.",
      analogy: "WHERE is like a bouncer at the door who checks each person before they enter the party. HAVING is like a manager inside who reviews groups of people after they've already gathered. You can't ask the bouncer to count how many people are in a group — that's the manager's job after everyone is inside.",
      example: "SELECT dept, COUNT(*) FROM emp WHERE status='Active' GROUP BY dept HAVING COUNT(*) > 5; (Finds active employees, groups them by dept, then only shows depts with more than 5 people).",
      followUps: [
        { question: "Can you use HAVING without GROUP BY?", answer: "Technically yes, it treats the whole result set as a single group, but it's bad practice. Always use WHERE for non-aggregated filtering." }
      ],
      keyPoints: ["WHERE = Pre-aggregation filtering", "HAVING = Post-aggregation filtering", "Aggregates (SUM, COUNT) go in HAVING"]
    },
    {
      id: 303,
      category: "Database", difficulty: 1,
      topic: "1. SQL Fundamentals",
      question: "What is the difference between TRUNCATE, DELETE, and DROP?",
      simpleAnswer: "DELETE removes specific rows (safe, can rollback). TRUNCATE empties the table instantly (fast, no rollback). DROP destroys the table structure completely.",
      explanation: "DELETE is a DML operation that logs every row deleted, making it slow for massive tables. TRUNCATE is a DDL operation that simply deallocates the data pages, making it lightning fast and resetting auto-increment IDs. DROP wipes the table from existence.",
      analogy: "DELETE is like erasing specific lines from a notebook — slow but precise, and you can undo it. TRUNCATE is like ripping out all the pages at once — instant, but you can't get them back. DROP is like throwing the entire notebook in a shredder — the notebook itself no longer exists.",
      example: "DELETE FROM logs WHERE date < '2023-01-01' (removes some). TRUNCATE TABLE logs (clears all). DROP TABLE logs (deletes the table itself).",
      followUps: [
        { question: "Does TRUNCATE fire triggers?", answer: "No. Since it doesn't process row-by-row, ON DELETE triggers will not fire during a TRUNCATE." }
      ],
      keyPoints: ["DELETE: DML, can rollback, fires triggers", "TRUNCATE: DDL, resets IDs, ultra-fast, no triggers", "DROP: Destroys table entirely"]
    },
    {
      id: 304,
      category: "Database", difficulty: 1,
      topic: "1. SQL Fundamentals",
      question: "Primary Key vs Unique Key?",
      simpleAnswer: "Primary Key: the main row identifier — must be UNIQUE and NOT NULL, one per table. Unique Key: enforces uniqueness on a column but allows NULL (behavior varies by DB engine), multiple allowed per table.",
      explanation: "Primary Key: uniquely identifies every row. Cannot be NULL. Only one per table. Automatically creates a clustered index (in most DBs). Used as the target for foreign keys. Unique Key/Constraint: also enforces uniqueness but is used for secondary identifiers (email, employee number). In most databases, a unique column can contain one or more NULLs (NULL means 'unknown' — two unknowns aren't considered equal). You can have multiple unique constraints per table. Key difference: Primary Key = identity of the row (never null, one per table). Unique Key = alternate identifier (nullable, multiple allowed).",
      analogy: "A Primary Key is like your national ID number — every citizen has exactly one, it's never null, and it's the official identifier. A Unique Key is like your email address — it must be unique, but in some systems you might not have one yet (NULL allowed), and you can have multiple unique identifiers per person.",
      example: "users table: id (Primary Key — auto-increment, never null). email (Unique Key — must be unique but nullable if user registers via phone). phone (Unique Key — must be unique but nullable if user registers via email).",
      followUps: [
        { question: "Can a Primary Key have multiple columns?", answer: "Yes — a Composite Primary Key uses multiple columns together to guarantee uniqueness. Common in junction tables: (user_id, role_id) as composite PK." }
      ],
      keyPoints: [
        "Primary Key: Uniquely identifies a row, strictly forbids NULL values, and is limited to exactly one per table.",
        "Unique Key: Enforces uniqueness for alternate identifiers (like email), allows NULL values in most engines, and supports multiple keys per table.",
        "Primary Key: Automatically generates a clustered index that physically sorts the table data on disk for optimal retrieval.",
        "Unique Key: Generates a non-clustered index pointing to the physical data rows to speed up secondary lookups."
      ]
    },
    {
      id: 305,
      category: "Database", difficulty: 1,
      topic: "1. SQL Fundamentals",
      question: "What is a Foreign Key and Referential Integrity?",
      simpleAnswer: "A Foreign Key links a column to a candidate key in another table, most commonly that table's Primary Key. Referential Integrity ensures this link remains valid, preventing 'orphaned' records.",
      explanation: "It stops you from creating a child record pointing to a non-existent parent, or deleting a parent that still has children.",
      analogy: "A Foreign Key is like a library card number on a borrowed book record. The card number must belong to a real registered member — you can't borrow a book under a member ID that doesn't exist. Referential integrity is the rule that enforces this: no orphaned book records pointing to non-existent members.",
      example: "In `Orders`, `user_id` is a Foreign Key to `Users.id`. You can't create an order for user 999 if user 999 doesn't exist.",
      followUps: [
        { question: "What does ON DELETE CASCADE do?", answer: "It automatically deletes all child records if the parent record is deleted." }
      ],
      keyPoints: ["Links tables together", "Prevents orphaned records", "ON DELETE CASCADE automates cleanup"]
    },
    {
      id: 306,
      category: "Database", difficulty: 1,
      topic: "1. SQL Fundamentals",
      question: "UNION vs UNION ALL?",
      simpleAnswer: "UNION combines results and removes duplicates. UNION ALL combines results and keeps duplicates (which makes it significantly faster).",
      explanation: "Because UNION removes duplicates, the database is forced to run a hidden sorting or hashing operation on the entire result set. If you don't care about duplicates, always use UNION ALL for better performance.",
      analogy: "UNION is like combining two guest lists and then manually crossing out duplicate names — thorough but time-consuming. UNION ALL is like stapling the two lists together without checking for duplicates — instant, but you might have the same name twice. If you know there are no duplicates, always staple.",
      example: "SELECT email FROM customers UNION ALL SELECT email FROM leads; (Lightning fast, merges both lists instantly).",
      followUps: [
        { question: "What are the rules for UNION?", answer: "Both queries must have the same number of columns, and the data types must align in the same order." }
      ],
      keyPoints: [
        "UNION: Combines two result sets while actively scanning for and removing all duplicate rows from the final output.",
        "UNION ALL: Combines two result sets immediately while retaining all duplicates, skipping the expensive deduplication phase.",
        "UNION: Significantly slower due to the hidden sorting and hashing operations required to filter out matching rows.",
        "UNION ALL: Extremely fast and efficient, making it the universally preferred choice unless deduplication is strictly necessary."
      ]
    },
    {
      id: 307,
      category: "Database", difficulty: 2,
      topic: "1. SQL Fundamentals",
      question: "EXISTS vs IN",
      simpleAnswer: "`IN` checks a value against a list. `EXISTS` checks whether a subquery returns at least one row. For correlated subqueries, `EXISTS` is often a good fit, but modern optimizers can rewrite both forms.",
      explanation: "Older interview advice says `IN` materializes everything and `EXISTS` always short-circuits. In reality, query optimizers are smarter than that. `EXISTS` is often better when you only care whether a related row exists, especially in correlated subqueries. But the real answer is: check the execution plan on your database engine.",
      analogy: "IN is like checking if your name is on a pre-printed list. EXISTS is like asking a security guard to check if anyone from your company is in the building — they stop looking the moment they find one person. EXISTS short-circuits as soon as it finds a match, which is often faster for large correlated checks.",
      example: "SELECT * FROM users u WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id); (Fast: Stops checking orders once it finds the user's first order).",
      followUps: [
        { question: "When is IN faster?", answer: "`IN` can be faster for tiny, static lists like `WHERE status IN ('PENDING', 'ACTIVE')`." }
      ],
      keyPoints: [
        "EXISTS: Checks if a correlated subquery returns at least one matching row and aggressively short-circuits execution as soon as a match is found.",
        "IN: Checks if a specific value exists within a static, pre-defined list or a fully materialized subquery result set.",
        "EXISTS: Significantly faster for evaluating large, correlated subqueries where the database can halt execution early upon finding a match.",
        "IN: Generally faster for evaluating small, hard-coded lists of static values."
      ]
    },
    {
      id: 308,
      category: "Database", difficulty: 1,
      topic: "1. SQL Fundamentals",
      question: "How does NULL work in SQL?",
      simpleAnswer: "NULL means 'unknown' or 'missing'. It is not zero or an empty string. You cannot use `=` to compare NULL; you must use `IS NULL`.",
      explanation: "Because NULL is unknown, any mathematical operation with NULL results in NULL. Asking `NULL = NULL` does not return true — it evaluates to UNKNOWN in SQL's three-valued logic, which is why a WHERE clause does not match it. Use functions like `COALESCE()` to replace NULLs with default values.",
      analogy: "NULL is like an empty box with a question mark on it. You don't know what's inside — it could be anything or nothing. Asking 'is the box equal to another empty box?' doesn't make sense because you don't know what either contains. That's why NULL = NULL is UNKNOWN, not TRUE — you compare unknowns with IS NULL, not with equals.",
      example: "SELECT * FROM users WHERE phone IS NULL; (Correct). SELECT * FROM users WHERE phone = NULL; (Wrong, returns 0 rows).",
      followUps: [
        { question: "What does COALESCE do?", answer: "Returns the first non-null value in a list. `COALESCE(phone, email, 'No Contact')`." }
      ],
      keyPoints: ["NULL = unknown data", "Use IS NULL, not =", "Math with NULL results in NULL", "Use COALESCE to handle defaults"]
    },

    // ─── 2. TRANSACTIONS & CONCURRENCY ─────────────────────────────────────────
    {
      id: 309,
      category: "Database", difficulty: 1,
      topic: "2. Transactions & Concurrency",
      question: "What are ACID properties?",
      simpleAnswer: "ACID guarantees reliable transactions. Atomicity (All or nothing), Consistency (Valid states), Isolation (Concurrent safety), Durability (Permanent saves).",
      explanation: "Atomicity ensures partial failures rollback (no half-saved data). Consistency enforces DB rules and constraints. Isolation keeps parallel transactions from messing each other up. Durability guarantees committed data survives server crashes via a Write-Ahead Log (WAL).",
      analogy: "ACID is like a bank vault with four security rules. Atomicity: the vault door either fully opens or stays fully shut — no half-open states. Consistency: only valid transactions are allowed — you can't withdraw more than your balance. Isolation: two people can't access the same safety deposit box simultaneously. Durability: once the vault logs a transaction, it survives even a power outage.",
      example: "Bank transfer: deduct from A, add to B. Both must succeed (Atomicity) and not overlap with another transfer reading the balance mid-way (Isolation).",
      followUps: [
        { question: "How does a database guarantee Durability?", answer: "By writing changes to a sequential Write-Ahead Log (WAL) on disk before updating the actual tables." }
      ],
      keyPoints: ["Atomicity: All or nothing", "Consistency: Valid states only", "Isolation: Safe concurrent execution", "Durability: Permanent once committed"]
    },
    {
      id: 310,
      category: "Database", difficulty: 2,
      topic: "2. Transactions & Concurrency",
      question: "What are Transaction Isolation Levels?",
      simpleAnswer: "They control how isolated concurrent transactions are. The levels are Read Uncommitted, Read Committed, Repeatable Read, and Serializable.",
      explanation: "Lower isolation levels are faster but allow data anomalies. Higher levels block anomalies but slow down the database due to strict locking. Postgres uses Read Committed by default, balancing safety and speed.",
      analogy: "Isolation levels are like noise-cancelling headphones with different settings. Read Uncommitted is no headphones — you hear everything, including unfinished conversations. Read Committed blocks out background noise. Repeatable Read keeps your current conversation stable. Serializable is a soundproof room — complete silence, but you have to wait for the room to be free.",
      example: "If you run financial reports, use Serializable so no data changes while your report runs. For a fast social feed, Read Committed is fine.",
      followUps: [
        { question: "What is the default isolation level in MySQL?", answer: "MySQL InnoDB defaults to Repeatable Read." }
      ],
      keyPoints: ["Read Uncommitted (Fastest, Dangerous)", "Read Committed (Default Postgres)", "Repeatable Read", "Serializable (Strictest, Slowest)"]
    },
    {
      id: 311,
      category: "Database", difficulty: 2,
      topic: "2. Transactions & Concurrency",
      question: "Explain Dirty Read, Non-Repeatable Read, and Phantom Read.",
      simpleAnswer: "Dirty: reading uncommitted data. Non-Repeatable: data changes mid-transaction. Phantom: new rows appear mid-transaction.",
      explanation: "Dirty read: You see an update before it's officially saved (it might rollback!). Non-repeatable: You read X=5, someone else updates X=6 and commits, you read X again and get 6. Phantom: You count 5 users, someone inserts a 6th user, you count again and get 6.",
      analogy: "Dirty read is like reading a draft email someone hasn't sent yet — they might delete it before sending. Non-repeatable read is like checking a price tag, walking away, and finding the price changed when you come back. Phantom read is like counting the chairs in a room, leaving, and returning to find someone added more chairs while you were gone.",
      example: "Prevent Dirty reads with Read Committed. Prevent Non-Repeatable reads with Repeatable Read. Prevent Phantoms with Serializable.",
      followUps: [
        { question: "Why doesn't everyone just use Serializable?", answer: "It locks too many resources, practically forcing transactions into a single-file line, killing concurrency and performance." }
      ],
      keyPoints: ["Dirty: Uncommitted data leak", "Non-Repeatable: Row value changed", "Phantom: New rows added"]
    },
    {
      id: 312,
      category: "Database", difficulty: 2,
      topic: "2. Transactions & Concurrency",
      question: "Optimistic Locking vs Pessimistic Locking",
      simpleAnswer: "Pessimistic: locks the record upfront in the DB before doing work — assumes conflicts are common. Optimistic: reads a version number, does work, checks for conflicts only at save time — assumes conflicts are rare.",
      explanation: "Pessimistic Locking: uses SELECT ... FOR UPDATE to lock the row immediately. Other transactions trying to read or write that row are blocked until the lock is released. Safe but reduces concurrency — long-running operations hold locks for a long time. Best for: high-conflict scenarios (ticket booking, bank transfers). Optimistic Locking: reads the row including a version column. Does app logic. On UPDATE, checks WHERE version = ? — if rows affected is 0, someone else updated it first (version mismatch) → throw OptimisticLockException → retry. No DB locks held during app logic. Best for: low-conflict scenarios (editing a wiki page, updating a profile). JPA @Version annotation implements optimistic locking automatically.",
      analogy: "Pessimistic locking is like reserving a meeting room the moment you think you might need it — you lock it upfront just in case. Optimistic locking is like working at your desk and only checking if the meeting room is free when you actually need it. If someone else booked it in the meantime, you get a conflict and try again. Optimistic works well when conflicts are rare.",
      example: "Pessimistic: SELECT * FROM seats WHERE id=1 FOR UPDATE → lock held while user enters card details → UPDATE seats SET status='BOOKED'. Optimistic: SELECT id, version FROM products WHERE id=1 → version=5 → UPDATE products SET stock=stock-1 WHERE id=1 AND version=5 → 0 rows affected → conflict → retry.",
      followUps: [
        { question: "Which one scales better?", answer: "Optimistic locking scales better — no DB locks held during app processing. Pessimistic locking reduces concurrency because locks are held for the entire duration of the operation, including app-level processing time." }
      ],
      keyPoints: [
        "Optimistic Locking: Relies on a version column to detect conflicts at the exact moment of saving, completely avoiding long-running database locks.",
        "Pessimistic Locking: Acquires a strict database lock upfront via SELECT FOR UPDATE, aggressively blocking other transactions from reading or writing.",
        "Optimistic Locking: Ideal for low-conflict, highly concurrent environments like user profile updates or collaborative wiki editing.",
        "Pessimistic Locking: Ideal for high-conflict, critical operations like financial ledger transfers or concert seat booking systems."
      ]
    },
    {
      id: 313,
      category: "Database", difficulty: 2,
      topic: "2. Transactions & Concurrency",
      question: "What is a Deadlock and how can you prevent it?",
      simpleAnswer: "A deadlock happens when two transactions wait infinitely for each other's locks. The database usually detects this and kills one transaction.",
      explanation: "Transaction A locks Row 1 and needs Row 2. Transaction B locks Row 2 and needs Row 1. Neither can proceed. Databases use 'wait-for graphs' to detect this and abort the 'deadlock victim'.",
      analogy: "A deadlock is like two cars at a narrow one-lane bridge from opposite ends. Car A won't reverse until Car B moves. Car B won't reverse until Car A moves. Neither can proceed — they're stuck forever. The only solution is for one driver (the database) to decide to back up (abort the transaction) so the other can pass.",
      example: "A strong way to reduce deadlock risk is to make transactions acquire locks in a consistent order everywhere in the app, such as always locking Account A before Account B.",
      followUps: [
        { question: "How does the app handle a deadlock victim exception?", answer: "Catch the exception and retry the entire transaction from the beginning." }
      ],
      keyPoints: ["Two transactions block each other circularly", "DB kills one to resolve", "Prevent by enforcing consistent lock order"]
    },
    {
      id: 314,
      category: "Database", difficulty: 2,
      topic: "2. Transactions & Concurrency",
      question: "What is MVCC (Multi-Version Concurrency Control)?",
      simpleAnswer: "MVCC is how modern databases handle concurrency without locking. It creates a new 'version' of a row on update, instead of overwriting it.",
      explanation: "This allows readers to not block writers, and writers to not block readers. Each transaction sees a 'snapshot' of the database as it was when the transaction started.",
      analogy: "MVCC is like a library that makes a photocopy of a book for each reader instead of handing out the original. Readers all get their own snapshot to read at their own pace. When someone wants to update the book, they create a new edition — the old copies stay valid for anyone still reading them. No one blocks anyone else.",
      example: "If Trans A takes 10 mins to run a report, and Trans B updates a user's name during that time, Trans A will still see the old name because of its snapshot.",
      followUps: [
        { question: "What downside does MVCC have in Postgres?", answer: "It leaves behind old row versions ('dead tuples') which take up disk space until the VACUUM process cleans them up." }
      ],
      keyPoints: ["Readers don't block writers", "Uses snapshots for isolation", "Updates create new row versions"]
    },
    {
      id: 315,
      category: "Database", difficulty: 2,
      topic: "2. Transactions & Concurrency",
      question: "How do you safely handle concurrent updates to a balance (e.g., ticket booking)?",
      simpleAnswer: "Never do a SELECT, subtract in code, and UPDATE. Instead, let the DB do the math atomically, or use Pessimistic Locking.",
      explanation: "If you SELECT the balance into your app, subtract, and send an UPDATE, race conditions will overwrite data. The safe way is an atomic update query, which naturally locks the row for the microsecond it takes to execute.",
      analogy: "Safely updating a balance is like a bank teller who never writes the balance on a sticky note, walks away to think, and then updates the ledger. Instead, the teller does the math directly in the ledger in one atomic motion. If you take the number away from the ledger to think about it, someone else might change it before you write it back.",
      example: "Safe: `UPDATE accounts SET balance = balance - 100 WHERE id = 1 AND balance >= 100;`",
      followUps: [
        { question: "What if you need to do complex app logic before updating?", answer: "Use `SELECT * FROM accounts WHERE id = 1 FOR UPDATE;` to lock the row while your app thinks." }
      ],
      keyPoints: ["Atomic updates (`balance = balance - X`)", "Use `FOR UPDATE` for complex logic", "Avoid read-modify-write cycles in app memory"]
    },
    {
      id: 316,
      category: "Database", difficulty: 2,
      topic: "2. Transactions & Concurrency",
      question: "Shared Lock vs Exclusive Lock?",
      simpleAnswer: "Shared Lock: multiple transactions can hold it simultaneously — allows concurrent reads but blocks writes. Exclusive Lock: only one transaction can hold it — blocks all other reads and writes.",
      explanation: "Shared Lock (S-Lock): acquired by SELECT ... FOR SHARE. Multiple transactions can hold a shared lock on the same row simultaneously — they can all read it. But if any transaction wants to write (UPDATE/DELETE), it needs an Exclusive Lock and must wait for all shared locks to be released. Exclusive Lock (X-Lock): acquired by SELECT ... FOR UPDATE or implicitly by UPDATE/DELETE. Only one transaction can hold it. All other transactions — whether trying to read (with FOR SHARE) or write — must wait. Normal SELECT (without FOR SHARE) in MVCC databases (PostgreSQL, MySQL InnoDB) places no lock at all — it reads a snapshot. Key rule: Shared locks are compatible with each other. Exclusive locks are incompatible with everything.",
      analogy: "A Shared Lock is like a reading room where multiple people can read the same book simultaneously — but nobody can take it away to write in it. An Exclusive Lock is like checking the book out — only you have it, nobody else can read or write in it until you return it. Writers must wait for all readers to finish before they can check the book out.",
      example: "Shared Lock: SELECT * FROM accounts WHERE id=1 FOR SHARE — multiple transactions can read simultaneously. Exclusive Lock: SELECT * FROM accounts WHERE id=1 FOR UPDATE — only one transaction can proceed, others wait. Normal SELECT: no lock in MVCC — reads a snapshot.",
      followUps: [
        { question: "Does a normal SELECT place a lock?", answer: "In modern MVCC databases (PostgreSQL, MySQL InnoDB), a normal SELECT places no locks — it reads a consistent snapshot. Only SELECT FOR SHARE and SELECT FOR UPDATE acquire locks." }
      ],
      keyPoints: [
        "Shared Lock: Allows multiple transactions to hold the lock and read the data simultaneously, while completely blocking any transaction attempting to write.",
        "Exclusive Lock: Restricts access to a single transaction at a time, completely blocking all other transactions from both reading and writing.",
        "Shared Lock: Acquired explicitly using the SELECT FOR SHARE statement in SQL.",
        "Exclusive Lock: Acquired automatically during UPDATE/DELETE operations, or explicitly via the SELECT FOR UPDATE statement."
      ]
    },

    // ─── 3. QUERY WRITING (HANDS-ON) ─────────────────────────────────────────
    {
      id: 317,
      category: "Database", difficulty: 2,
      topic: "3. Query Writing",
      question: "How do you find the second highest salary?",
      simpleAnswer: "Use the `DENSE_RANK()` window function, or use `ORDER BY salary DESC LIMIT 1 OFFSET 1`.",
      explanation: "Using `DENSE_RANK()` is the most robust way because it correctly handles ties (e.g., if two people share the top salary, it still finds the true second highest). LIMIT/OFFSET is faster but fails on ties.",
      analogy: "Finding the second highest salary is like a race podium. You want the silver medal winner, not the gold. DENSE_RANK handles ties correctly — if two people tie for gold, the silver still goes to the next distinct salary, not the third person. LIMIT/OFFSET is like just skipping the first row, which breaks if two people share first place.",
      example: "WITH Ranked AS (SELECT salary, DENSE_RANK() OVER(ORDER BY salary DESC) as rnk FROM emp) SELECT salary FROM Ranked WHERE rnk = 2;",
      followUps: [
        { question: "How to do it without Window Functions?", answer: "`SELECT MAX(salary) FROM emp WHERE salary < (SELECT MAX(salary) FROM emp);`" }
      ],
      keyPoints: ["DENSE_RANK() handles ties perfectly", "LIMIT/OFFSET is simpler but risky", "Subqueries can also work"]
    },
    {
      id: 318,
      category: "Database", difficulty: 1,
      topic: "3. Query Writing",
      question: "How do you find duplicate records in a table?",
      simpleAnswer: "Use `GROUP BY` on the columns you want to check, and use `HAVING COUNT(*) > 1` to show only the ones that repeat.",
      explanation: "Grouping collapses identical rows into a single row. The `COUNT(*)` tells you how many original rows made up that group. `HAVING` acts as the filter.",
      analogy: "Finding duplicates is like a roll call where the teacher groups students by name and counts how many times each name appears. Anyone whose name appears more than once is a duplicate. GROUP BY is the grouping, COUNT(*) is the tally, and HAVING COUNT(*) > 1 is the teacher circling names that appear more than once.",
      example: "SELECT email, COUNT(*) FROM users GROUP BY email HAVING COUNT(*) > 1;",
      followUps: [
        { question: "How do you see the full row details of those duplicates?", answer: "Join the original table to this aggregate query, or use a window function `COUNT(*) OVER(PARTITION BY email)`." }
      ],
      keyPoints: ["GROUP BY duplicate columns", "HAVING COUNT(*) > 1", "Fast and standard approach"]
    },
    {
      id: 319,
      category: "Database", difficulty: 2,
      topic: "3. Query Writing",
      question: "How do you delete duplicate records but keep the one with the lowest ID?",
      simpleAnswer: "Use a CTE with `ROW_NUMBER() OVER (PARTITION BY duplicate_col ORDER BY id)`. Then delete where the row number is greater than 1.",
      explanation: "This assigns a sequence number to each duplicate group, ordering by ID. The lowest ID gets row number 1. Anything > 1 is a duplicate to be deleted.",
      analogy: "Deleting duplicates while keeping the original is like a post office that receives multiple copies of the same letter. They stamp the first one received (lowest ID) as the official copy and shred the rest. ROW_NUMBER assigns the stamp — number 1 is kept, everything above 1 is discarded.",
      example: "WITH CTE AS (SELECT id, ROW_NUMBER() OVER(PARTITION BY email ORDER BY id) as rn FROM users) DELETE FROM users WHERE id IN (SELECT id FROM CTE WHERE rn > 1);",
      followUps: [
        { question: "What if the table has no primary key?", answer: "In PostgreSQL, you can use the hidden physical `ctid` column: `DELETE FROM users WHERE ctid NOT IN (SELECT MIN(ctid) FROM users GROUP BY email);`" }
      ],
      keyPoints: ["CTE + ROW_NUMBER() is the best approach", "PARTITION BY isolates the groups", "Delete row number > 1"]
    },
    {
      id: 320,
      category: "Database", difficulty: 2,
      topic: "3. Query Writing",
      question: "What is the difference between ROW_NUMBER, RANK, and DENSE_RANK?",
      simpleAnswer: "ROW_NUMBER gives a unique sequential number (1,2,3). RANK leaves a gap after ties (1,1,3). DENSE_RANK leaves no gaps after ties (1,1,2).",
      explanation: "Used with the `OVER()` clause, these rank items. If two employees share the top salary: ROW_NUMBER arbitrarily gives one '1' and the other '2'. RANK gives them both '1', but the next person gets '3'. DENSE_RANK gives them both '1', and the next person gets '2'.",
      analogy: "Imagine a race with two runners tying for first. ROW_NUMBER arbitrarily calls one of them first and the other second — no ties allowed. RANK calls them both first, but then skips to third for the next runner — like a podium with two gold medals and no silver. DENSE_RANK calls them both first and gives the next runner silver — no gaps in the medal count.",
      example: "Scores: 90, 90, 80. ROW_NUMBER: 1, 2, 3. RANK: 1, 1, 3. DENSE_RANK: 1, 1, 2.",
      followUps: [
        { question: "Which one is best for finding the Nth highest value?", answer: "DENSE_RANK, because it won't skip ranks if there are ties." }
      ],
      keyPoints: ["ROW_NUMBER: Strict sequence", "RANK: Ties share rank, leaves gaps", "DENSE_RANK: Ties share rank, no gaps"]
    },
    {
      id: 321,
      category: "Database", difficulty: 2,
      topic: "3. Query Writing",
      question: "How do you calculate a running total / cumulative sum?",
      simpleAnswer: "Use the `SUM()` aggregate function as a window function, ordered by date or ID.",
      explanation: "By doing `SUM() OVER (ORDER BY date)`, the database adds the current row's value to the sum of all preceding rows. It accumulates data row-by-row without collapsing them into a single row.",
      analogy: "A running total is like a bank statement. Each row shows the transaction amount, but also the balance after that transaction — which is the sum of all previous transactions plus the current one. The balance accumulates row by row, just like SUM() OVER (ORDER BY date) accumulates values as it moves down the result set.",
      example: "SELECT date, amount, SUM(amount) OVER (ORDER BY date) as running_total FROM sales;",
      followUps: [
        { question: "How do you restart the running total every month?", answer: "Add a PARTITION BY clause: `SUM(amount) OVER (PARTITION BY month ORDER BY date)`." }
      ],
      keyPoints: ["Window functions don't collapse rows", "ORDER BY determines accumulation order", "PARTITION BY resets the sum"]
    },
    {
      id: 322,
      category: "Database", difficulty: 2,
      topic: "3. Query Writing",
      question: "Find employees who earn more than their managers.",
      simpleAnswer: "Perform a Self-Join. Join the `employees` table to itself, linking the employee's `manager_id` to the manager's `id`.",
      explanation: "A self-join allows you to compare rows within the exact same table. Alias the table twice (e.g., 'e' for employee, 'm' for manager) and compare their salaries.",
      analogy: "A self-join is like comparing two columns from the same employee directory. You need to look up each employee's salary AND their manager's salary from the same table. It's like folding the directory in half and comparing the left side (employee) to the right side (manager) — same book, two different rows.",
      example: "SELECT e.name FROM emp e JOIN emp m ON e.manager_id = m.id WHERE e.salary > m.salary;",
      followUps: [
        { question: "What kind of JOIN is a Self-Join?", answer: "It's usually just an INNER JOIN or LEFT JOIN applied to the same table twice." }
      ],
      keyPoints: ["Self-Join pattern", "Alias the table twice", "Link FK to PK (manager_id = id)"]
    },
    {
      id: 323,
      category: "Database", difficulty: 2,
      topic: "3. Query Writing",
      question: "Find the top 3 highest paid employees in each department.",
      simpleAnswer: "Use `DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC)`. Wrap it in a CTE and filter `WHERE rank <= 3`.",
      explanation: "The `PARTITION BY` acts like a group, resetting the rank back to 1 for every new department. Because window functions run late in query execution, you can't filter on them directly in the WHERE clause, so you must wrap it in a Common Table Expression (CTE).",
      analogy: "PARTITION BY in a window function is like running separate competitions in each department. Each department has its own leaderboard — the ranking resets to 1 for every new department. You're not ranking everyone globally; you're running parallel rankings simultaneously, one per group.",
      example: "WITH Ranked AS (SELECT name, dept, DENSE_RANK() OVER(PARTITION BY dept ORDER BY salary DESC) as rnk FROM emp) SELECT * FROM Ranked WHERE rnk <= 3;",
      followUps: [
        { question: "What is a CTE?", answer: "A Common Table Expression (WITH clause). It creates a temporary result set that you can select from immediately." }
      ],
      keyPoints: ["PARTITION BY resets rankings", "Wrap in CTE to allow WHERE filtering", "DENSE_RANK handles ties"]
    },

    // ─── 4. PERFORMANCE OPTIMIZATION ──────────────────────────────────────────
    {
      id: 324,
      category: "Database", difficulty: 1,
      topic: "4. Performance Optimization",
      question: "What is a Database Index and how does it work?",
      simpleAnswer: "An index is a data structure (usually a B-Tree) that improves data retrieval speed at the cost of slower writes and extra storage.",
      explanation: "Without an index, the database must do a 'Full Table Scan' (reading every single row) to find matches. A B-Tree index keeps a sorted copy of a column with pointers to the actual rows, allowing O(log N) binary search lookups instead of O(N).",
      analogy: "A database index is exactly like the index at the back of a textbook. Without it, finding 'Java' means reading every page from cover to cover. With the index, you look up 'Java' alphabetically and jump directly to page 247. The trade-off: maintaining the index takes extra work every time a new page is added.",
      example: "It's exactly like an index at the back of a textbook. Instead of reading 500 pages to find 'Java', you look up 'Java' in the index to get the exact page number.",
      followUps: [
        { question: "Why not index every column?", answer: "Because every time you INSERT, UPDATE, or DELETE a row, the database must rebalance all the B-Trees, making write operations painfully slow." }
      ],
      keyPoints: ["Speeds up SELECTs", "Slows down INSERT/UPDATE/DELETE", "Implemented via B-Trees"]
    },
    {
      id: 325,
      category: "Database", difficulty: 2,
      topic: "4. Performance Optimization",
      question: "Clustered vs Non-Clustered Index?",
      simpleAnswer: "Clustered index: physically sorts the table data on disk — the table IS the index. Non-Clustered index: a separate structure with pointers to the actual data rows — requires a second lookup.",
      explanation: "Clustered Index: the table rows are physically stored in the order of the index key. Only ONE clustered index per table (data can only be sorted one way). In most DBs, the Primary Key automatically creates the clustered index. Range queries on the clustered key are very fast — rows are physically adjacent on disk. Non-Clustered Index: a separate B-Tree structure that stores the indexed column(s) and a pointer (row locator) to the actual data row. Multiple non-clustered indexes per table. Lookup requires two steps: find the entry in the index, then follow the pointer to the actual row ('key lookup' or 'bookmark lookup'). Covering indexes eliminate this second hop. Key difference: Clustered = data IS sorted by this key. Non-Clustered = separate lookup structure pointing to data.",
      analogy: "A clustered index is like a phone book sorted by last name — the physical pages are in alphabetical order, so finding 'Smith' is instant. A non-clustered index is like a separate card catalog in a library — it's sorted differently and points you to the shelf location, but you still have to walk to the shelf to get the book.",
      example: "Clustered: users table sorted by id (Primary Key) — range query WHERE id BETWEEN 100 AND 200 reads contiguous pages. Non-Clustered: index on email — finds email in index, follows pointer to get full row. Covering: index on (email, name) — query SELECT name WHERE email=? never touches the main table.",
      followUps: [
        { question: "What is a table without a clustered index called?", answer: "A 'Heap'. Data is stored in insertion order with no physical sorting. Reads are slower for range queries. In PostgreSQL, all tables are heaps — the clustered index concept works differently (CLUSTER command physically reorders but doesn't maintain order on inserts)." }
      ],
      keyPoints: [
        "Clustered Index: Physically sorts and stores the actual table data on disk according to the index key, meaning a table can only have one.",
        "Non-Clustered Index: Creates a separate, independent B-Tree structure containing pointers back to the original unsorted data rows.",
        "Clustered Index: Delivers exceptionally fast performance for range-based queries because the data naturally sits in sequential order on the hard drive.",
        "Non-Clustered Index: Requires a secondary 'bookmark lookup' step to fetch the full row data, unless specifically designed as a covering index."
      ]
    },
    {
      id: 326,
      category: "Database", difficulty: 2,
      topic: "4. Performance Optimization",
      question: "What is a Composite Index and the Leftmost Prefix Rule?",
      simpleAnswer: "A composite index covers multiple columns. The leftmost-prefix rule means the leading columns matter most for efficient lookups.",
      explanation: "If you index `(last_name, first_name)`, it's like a phone book. If you search `last_name='Smith'`, it works well. If you search `last_name='Smith' AND first_name='John'`, it also works well. If you search only `first_name='John'`, the index is usually much less effective for lookup because the data is primarily ordered by last name. Some engines may still use the index for scans or special optimizations, but you should not rely on it as the main access path.",
      analogy: "A composite index on (last_name, first_name) is like a phone book sorted first by last name, then by first name within each last name. If you search by last name, the book is perfectly organized for you. If you search only by first name, the book is useless — first names are scattered everywhere because the primary sort is by last name.",
      example: "CREATE INDEX idx_name ON users(last_name, first_name);",
      followUps: [
        { question: "How should you order columns in a composite index?", answer: "Order columns based on real query patterns: put the columns most often used together at the left side, and consider equality predicates before range predicates. Selectivity matters, but workload shape matters more than a single hard rule." }
      ],
      keyPoints: ["Index on multiple columns", "Query must use leftmost columns", "Order columns by highest cardinality"]
    },
    {
      id: 327,
      category: "Database", difficulty: 3,
      topic: "4. Performance Optimization",
      question: "What is an Index-Only Scan (Covering Index)?",
      simpleAnswer: "A query where all requested columns are already inside the index, meaning the database can return the result instantly without ever reading the actual data table.",
      explanation: "Normally, an index finds the match and uses a pointer to fetch the full row from disk. If you only SELECT columns that are part of the index structure itself, the DB skips the disk lookup entirely. This is one of the ultimate query optimizations.",
      analogy: "A covering index is like a library card catalog that already has the book's summary printed on the card. Normally you look up the card to find the shelf location, then walk to the shelf to read the book. With a covering index, the answer is right there on the card — you never need to leave the catalog room.",
      example: "Index on `(email, created_at)`. Query: `SELECT created_at FROM users WHERE email='test@test.com'`. Fast because `created_at` is right there in the index.",
      followUps: [
        { question: "What is an INCLUDE clause in an index?", answer: "In Postgres, `INCLUDE(column)` stores extra payload data in the index leaf nodes specifically to enable Index-Only scans without sorting by that column." }
      ],
      keyPoints: ["All selected columns exist in index", "Bypasses table disk lookup completely", "Massive read performance boost"]
    },
    {
      id: 328,
      category: "Database", difficulty: 2,
      topic: "4. Performance Optimization",
      question: "How do you troubleshoot a slow SQL query?",
      simpleAnswer: "Run `EXPLAIN ANALYZE` before the query to see the execution plan. Look for 'Sequential Scans' (Full Table Scans) and ensure indexes are being hit.",
      explanation: "`EXPLAIN ANALYZE` actually executes the query and breaks down exactly how many milliseconds were spent sorting, joining, and scanning. If a massive table is doing a 'Seq Scan', it means you are missing an index or writing a query that prevents index usage.",
      analogy: "EXPLAIN ANALYZE is like a GPS trip report after your journey. Before you drive, EXPLAIN shows the planned route. After you drive, EXPLAIN ANALYZE shows the actual route taken, how long each segment took, and where you hit traffic. If the GPS planned for a highway but you ended up on a dirt road (sequential scan instead of index scan), you know exactly where to fix the route.",
      example: "EXPLAIN ANALYZE SELECT * FROM orders WHERE status = 'PENDING';",
      followUps: [
        { question: "Why is sorting slow?", answer: "Sorting millions of rows requires memory. If it exceeds `work_mem`, it spills to disk, drastically slowing things down. An index on the ORDER BY column fixes this." }
      ],
      keyPoints: ["EXPLAIN ANALYZE shows execution plans", "Look for Seq Scans", "Check join and sort bottlenecks"]
    },
    {
      id: 329,
      category: "Database", difficulty: 2,
      topic: "4. Performance Optimization",
      question: "Why is LIMIT/OFFSET pagination bad and what is Cursor Pagination?",
      simpleAnswer: "OFFSET is terrible for deep pages because the database still reads and counts every skipped row. Cursor pagination uses `WHERE id > last_seen_id` to jump instantly.",
      explanation: "If you ask for `OFFSET 100000 LIMIT 10`, the DB physically reads 100,010 rows just to throw the first 100,000 away. Cursor pagination remembers the last item displayed and uses a B-Tree index to instantly jump to that point without scanning previous rows.",
      analogy: "OFFSET pagination is like a librarian who starts from page 1 of a catalog and counts to page 50,000 every time you ask for page 5,001 — even though they throw away the first 50,000 results. Cursor pagination is like using a bookmark — you jump directly to where you left off without counting from the beginning every time.",
      example: "Bad: `SELECT * FROM orders OFFSET 50000 LIMIT 50`. Good: `SELECT * FROM orders WHERE id > 50000 LIMIT 50`.",
      followUps: [
        { question: "What's the downside of Cursor pagination?", answer: "You cannot jump directly to a specific page number (e.g., 'Page 50'). You can only do 'Next' and 'Previous'." }
      ],
      keyPoints: ["OFFSET reads all skipped rows (slow)", "Cursor uses index to jump (fast)", "Cursor prevents data shifting glitches"]
    },
    {
      id: 330,
      category: "Database", difficulty: 2,
      topic: "4. Performance Optimization",
      question: "What is the N+1 query problem?",
      simpleAnswer: "Fetching N items (1 query), then looping in your app to fetch related data for each item (N queries), resulting in N+1 total database hits.",
      explanation: "This is a massive performance killer common in ORMs like Hibernate (Lazy Loading). If you get 100 users, and then loop to get their addresses, you hit the DB 101 times, causing severe network latency overhead.",
      analogy: "The N+1 problem is like a teacher who asks the class 'who has a pet?' (1 query), then walks up to each student individually to ask 'what kind of pet?' (N queries). A smarter teacher would ask everyone at once: 'raise your hand and tell me your pet type' — one question, all answers. That's what a JOIN does.",
      example: "Fix it by using a `JOIN` to fetch everything in 1 query, or fetching all related data in a second query using `WHERE user_id IN (1, 2, 3...)`.",
      followUps: [
        { question: "How do you fix this in Spring Boot/Hibernate?", answer: "Use `@EntityGraph`, or write a JPQL query with `JOIN FETCH`." }
      ],
      keyPoints: ["Caused by loops generating DB queries", "Kills performance due to network latency", "Fix with JOINs or Batch Fetching"]
    },
    {
      id: 331,
      category: "Database", difficulty: 2,
      topic: "4. Performance Optimization",
      question: "Why do databases sometimes ignore an index?",
      simpleAnswer: "If a column has low cardinality (few unique values) or you wrap the column in a function, the DB decides a full table scan is faster.",
      explanation: "If you index a boolean `is_active` column, scanning the index and doing random disk lookups for 50% of the table is slower than just reading the table sequentially. Also, using functions `WHERE YEAR(date) = 2023` breaks the index. Use `WHERE date >= '2023-01-01'` instead.",
      analogy: "A database ignoring an index is like a librarian deciding it's faster to scan every shelf than to use the card catalog. If half the books match your search (low cardinality), walking the shelves is genuinely faster than looking up each card and then fetching each book individually. The database makes the same cost-benefit calculation.",
      example: "Wildcards break indexes too: `LIKE '%smith'` ignores the index because it doesn't know the starting letter. `LIKE 'smith%'` works fine.",
      followUps: [
        { question: "What is a Function-Based index?", answer: "If you MUST query `LOWER(email)`, you can create a specific index on `LOWER(email)` so the DB doesn't ignore it." }
      ],
      keyPoints: ["Low cardinality (e.g., booleans) breaks indexes", "Wrapping columns in functions breaks indexes", "Leading wildcards (`%abc`) break indexes"]
    },

    // ─── 5. SCHEMA DESIGN ─────────────────────────────────────────────────────
    {
      id: 332,
      category: "Database", difficulty: 2,
      topic: "5. Schema Design",
      question: "What is Database Normalization (1NF, 2NF, 3NF)?",
      simpleAnswer: "Normalization organizes data to reduce redundancy. 1NF ensures atomic values. 2NF removes partial dependencies. 3NF removes transitive dependencies.",
      explanation: "1NF: No comma-separated lists in a column. 2NF: If you use a composite key, non-key columns must depend on the whole key. 3NF: Non-key columns cannot depend on other non-key columns (e.g., City depends on Zip_Code, not User_ID, so split them).",
      analogy: "Normalization is like organizing a messy filing cabinet. 1NF means each folder has one type of document — no stuffing multiple items in one slot. 2NF means every document in a folder belongs there because of the folder's label, not just part of it. 3NF means documents don't depend on each other — if city depends on zip code, not on the person's name, give city its own folder.",
      example: "Mnemonic: 'Every non-key attribute must provide a fact about the key (1NF), the whole key (2NF), and nothing but the key (3NF).'",
      followUps: [
        { question: "What is the primary benefit?", answer: "It prevents update anomalies. If you change a city's name, you only update it in one place, not in 50,000 user records." }
      ],
      keyPoints: ["1NF: Atomic values", "2NF: No partial dependencies", "3NF: No transitive dependencies"]
    },
    {
      id: 333,
      category: "Database", difficulty: 2,
      topic: "5. Schema Design",
      question: "Normalization vs Denormalization?",
      simpleAnswer: "Normalization: reduces data duplication by splitting into related tables — good for write-heavy systems. Denormalization: intentionally adds duplication to avoid slow JOINs — good for read-heavy systems.",
      explanation: "Normalization (3NF): each piece of data stored once. Updates are simple — change in one place. Requires JOINs to reconstruct data. Best for: OLTP systems (orders, payments, user accounts) where data changes frequently and consistency matters. Denormalization: intentionally copies data across tables (e.g., store user_name in the orders table instead of joining users). Reads are faster — no JOINs needed. But writes are complex — must update all copies when data changes. Risk of inconsistency. Best for: OLAP/reporting systems, data warehouses, read-heavy APIs where query speed matters more than write simplicity. Rule: normalize first, denormalize only when you have a proven performance problem.",
      analogy: "Normalization is like a well-organized library where each book is in exactly one place — no duplicates, easy to update. Denormalization is like keeping a personal bookshelf with copies of your most-read books — you can grab them instantly without going to the library, but if the library updates an edition, your copy is now out of date.",
      example: "Normalized: orders table has user_id FK → JOIN users to get name. Denormalized: orders table has user_name column — no JOIN needed but if user changes name, must update all their orders. Data Warehouses use Star Schema (heavily denormalized) for fast analytics.",
      followUps: [
        { question: "What is the risk of Denormalization?", answer: "Data inconsistency — if the user changes their name, you must update the users table AND every row in the orders table. Missed updates create stale data. Use event-driven updates (Kafka) to keep denormalized copies in sync." }
      ],
      keyPoints: [
        "Normalization: Structurally separates data into multiple tables to eliminate redundancy, ensuring data consistency and fast, isolated writes.",
        "Denormalization: Intentionally duplicates data across tables to eliminate expensive JOIN operations, dramatically accelerating complex read queries.",
        "Normalization: The gold standard for OLTP systems like e-commerce checkouts where constant data updates demand absolute accuracy.",
        "Denormalization: The preferred strategy for OLAP systems and Data Warehouses where reporting speed takes priority over storage efficiency."
      ]
    },
    {
      id: 334,
      category: "Database", difficulty: 2,
      topic: "5. Schema Design",
      question: "Database Partitioning vs Sharding?",
      simpleAnswer: "Partitioning: splits a large table into smaller pieces within the SAME database server. Sharding: splits data across MULTIPLE different database servers.",
      explanation: "Partitioning: the table is divided into partitions (by range, list, or hash) but all partitions live on the same server. The DB engine automatically routes queries to the right partition — transparent to the application. Speeds up queries by scanning only relevant partitions (partition pruning). Types: Range (by date/ID), List (by region/status), Hash (even distribution). Sharding: data is split across multiple independent DB servers (shards). Each shard is a separate DB instance. Application (or a routing layer) must know which shard to query. Enables horizontal scaling beyond what a single server can handle. Adds significant complexity: no cross-shard JOINs, distributed transactions are hard, resharding is painful. Rule: try partitioning first (same server, transparent). Use sharding only when a single server can't handle the load even with partitioning, caching, and read replicas.",
      analogy: "Partitioning is like splitting a massive filing cabinet into monthly drawers — everything is still in the same office, but you only open the January drawer when looking for January records. Sharding is like moving half the filing cabinets to a different building — you've distributed the load across locations, but now cross-building lookups require coordination.",
      example: "Partitioning: 1TB logs table → 12 monthly partitions on same server. Query WHERE date >= '2024-01-01' scans only the January partition. Sharding: 1 billion users → users A-M on Shard1 (Server1), users N-Z on Shard2 (Server2). App hashes user_id to determine which server to query.",
      followUps: [
        { question: "Why is sharding painful?", answer: "No cross-shard JOINs — must do application-level joins. Distributed transactions across shards are complex. Resharding (adding a new shard) requires moving data. Hot spots if shard key is poorly chosen. Exhaust all other options (partitioning, caching, read replicas) before sharding." }
      ],
      keyPoints: [
        "Partitioning: Splits a massive table into smaller, manageable chunks that still reside comfortably within the exact same database server.",
        "Sharding: Distributes data horizontally across entirely different physical database servers to bypass hardware capacity limits.",
        "Partitioning: Operates completely transparently to the application layer and massively speeds up queries via partition pruning.",
        "Sharding: Introduces extreme architectural complexity, requiring the application layer to actively route queries and handle cross-shard joins."
      ]
    },
    {
      id: 335,
      category: "Database", difficulty: 2,
      topic: "5. Schema Design",
      question: "How to perform a Zero-Downtime Database Migration (Schema change)?",
      simpleAnswer: "Use the 'Expand and Contract' pattern. Never rename or drop a column directly, as it instantly breaks live apps.",
      explanation: "Step 1: Expand (Add new column). Step 2: Update App (Write to BOTH old and new columns). Step 3: Migrate Data (Copy old data to new column). Step 4: Switch App (Read/Write only from new column). Step 5: Contract (Drop old column later).",
      analogy: "Zero-downtime migration is like renovating a shop while it's still open. You don't close the shop and gut everything at once — you add the new counter while the old one is still serving customers, gradually move operations to the new counter, and only remove the old one after everyone has switched. The shop never closes.",
      example: "Renaming `first_name` to `given_name`. Add `given_name` -> App writes to both -> Copy old data -> App reads `given_name` -> Drop `first_name`.",
      followUps: [
        { question: "How to safely add an index to a live Postgres DB?", answer: "Use `CREATE INDEX CONCURRENTLY`. A normal `CREATE INDEX` locks the table for writes." }
      ],
      keyPoints: ["Expand and Contract pattern", "Never drop/rename directly", "Write to both columns during transition"]
    },
    {
      id: 336,
      category: "Database", difficulty: 2,
      topic: "5. Schema Design",
      question: "SQL vs NoSQL — when to use which?",
      simpleAnswer: "SQL: structured data, ACID transactions, complex relationships — use for financial data, orders, user accounts. NoSQL: flexible schema, massive scale, high write throughput — use for catalogs, sessions, logs, social graphs.",
      explanation: "SQL (PostgreSQL, MySQL): strict schema, ACID transactions, complex JOINs, strong consistency. Best for: anything where data integrity and relationships matter — financial ledgers, order management, user accounts. NoSQL types: Document (MongoDB) — flexible schema, nested JSON, no JOINs. Best for: product catalogs, CMS, user profiles. Key-Value (Redis) — O(1) reads/writes. Best for: caching, sessions, rate limiting. Wide-Column (Cassandra) — high write throughput, time-series. Best for: logs, IoT, event history. Graph (Neo4j) — relationship traversal. Best for: social networks, fraud detection. Polyglot persistence: in microservices, each service picks the best DB for its data — OrderService uses PostgreSQL, CatalogService uses MongoDB, SessionService uses Redis.",
      analogy: "SQL is like a well-organized spreadsheet with strict column types and relationships — perfect for structured data where integrity matters. NoSQL is like a flexible notebook where each page can have a different format — great for rapidly changing data or massive scale where rigid structure would slow you down.",
      example: "E-commerce: PostgreSQL for orders/payments (ACID). MongoDB for product catalog (flexible attributes). Redis for cart/sessions (fast). Cassandra for order event history (high write). Elasticsearch for search.",
      followUps: [
        { question: "Can a system use both?", answer: "Yes — polyglot persistence is the standard in microservices. Each service owns its DB and picks the right tool. OrderService uses PostgreSQL, SessionService uses Redis, CatalogService uses MongoDB." }
      ],
      keyPoints: [
        "SQL: Enforces rigid schemas, strict ACID transactions, and deep relational integrity for mission-critical business data.",
        "NoSQL: Embraces flexible schemas, massive horizontal scalability, and eventual consistency for high-throughput, varied data shapes.",
        "SQL: The mandatory choice for financial ledgers, transactional order management, and secure user account systems.",
        "NoSQL: The superior choice for rapidly evolving product catalogs, high-speed session caching, and heavy application logging."
      ]
    },
    {
      id: 337,
      category: "Database", difficulty: 2,
      topic: "5. Schema Design",
      question: "How do you design a multi-tenant database?",
      simpleAnswer: "Three patterns: 1) Shared DB, Shared Schema (Tenant ID column). 2) Shared DB, Separate Schemas. 3) Separate DB per tenant.",
      explanation: "Tenant ID column is the cheapest and easiest to scale, but risks data leaking if developers forget the WHERE clause. Separate DBs provide ultimate security and isolation (good for enterprise compliance) but are costly and hard to manage.",
      analogy: "Multi-tenancy is like an apartment building. Shared schema with a tenant ID column is like a shared lobby where everyone lives in the same building but has their own apartment number — cheap but you must always check the apartment number. Separate databases per tenant is like separate houses — maximum privacy and isolation, but much more expensive to maintain.",
      example: "SaaS startups use Tenant ID columns. Healthcare software uses Separate DBs for HIPAA compliance.",
      followUps: [
        { question: "How does Hibernate support multi-tenancy?", answer: "Hibernate natively supports both separate schema and separate DB connections dynamically via TenantIdentifierResolvers." }
      ],
      keyPoints: ["Shared Schema = Cheap, risky isolation", "Separate Schema = Balanced approach", "Separate DB = Expensive, maximum security"]
    },
    {
      id: 338,
      category: "Database", difficulty: 2,
      topic: "5. Schema Design",
      question: "Should you use UUIDs or Auto-Increment IDs as primary keys?",
      simpleAnswer: "Use Auto-increment (Integers) for fast internal joins and B-Tree indexing. Use UUIDs for external/public APIs so competitors can't guess your data volume.",
      explanation: "Integers are small (4 bytes) and sequential, which is perfect for B-Tree insertion. Standard UUIDv4 (16 bytes) is random, which fragments B-Trees and slows down inserts massively. The modern solution is UUIDv7, which is time-sortable.",
      analogy: "Auto-increment integers are like numbered tickets at a deli — sequential, compact, and the counter knows exactly where to add the next one. UUIDs are like randomly generated serial numbers — globally unique and unpredictable, which is great for security, but random insertion scatters them across the index like confetti, causing fragmentation.",
      example: "Internal DB relations use Integers (`user_id = 5`). Public URLs use UUIDs (`/orders/550e8400-e29b-41d4...`) so people can't scrape `/orders/6`.",
      followUps: [
        { question: "What is the problem with UUID fragmentation?", answer: "Because UUIDv4 is random, inserts scatter across data pages, causing frequent 'page splits' and severe disk I/O overhead." }
      ],
      keyPoints: ["Integers = Fast indexing, internal use", "UUIDs = Security through obscurity, external use", "Random UUIDs fragment B-Trees"]
    },
    {
      id: 339,
      category: "Database", difficulty: 2,
      topic: "4. Performance Optimization",
      difficulty: "Core",
      question: "What are EXPLAIN and EXPLAIN ANALYZE, and how do you use them?",
      simpleAnswer: "EXPLAIN shows the query plan the database intends to use. EXPLAIN ANALYZE actually runs the query and shows what really happened, including timings and row counts.",
      explanation: "When a query is slow, guessing is risky. EXPLAIN helps you see whether the database is doing an index scan, sequential scan, join strategy, sort, or aggregation. EXPLAIN ANALYZE is even more useful because it reveals actual runtime behavior and whether the optimizer's estimates were wrong. This is often the fastest route to fixing production query issues.",
      analogy: "EXPLAIN is like a GPS showing you the planned route before you drive. EXPLAIN ANALYZE is like the trip report after you've driven — it shows the actual route taken, how long each segment really took, and where you hit unexpected traffic. The planned route and the actual route can differ significantly, and the difference tells you exactly where to optimize.",
      example: "A query on orders is slow. EXPLAIN ANALYZE shows a sequential scan over 10 million rows because the filter column is not indexed. Adding the right index changes the plan to an index scan and drops latency dramatically.",
      followUps: [{ question: "Why can bad row-count estimates hurt performance?", answer: "Because the optimizer may choose the wrong join order or scan strategy if it incorrectly estimates how many rows each step will produce." }],
      keyPoints: ["EXPLAIN = planned path", "EXPLAIN ANALYZE = actual execution details", "Use it to validate index usage and join strategy", "Essential for real query tuning"]
    },
    {
      id: 340,
      category: "Database", difficulty: 2,
      topic: "2. Transactions & Concurrency",
      difficulty: "Intermediate",
      question: "What is read replica lag and why does it matter?",
      simpleAnswer: "Read replica lag is the delay between a primary database accepting a write and a replica catching up to that change. During lag, reads from the replica can be stale.",
      explanation: "Read replicas improve read scalability, but they usually replicate asynchronously. That means a user might write data successfully to the primary and then immediately read from a replica that has not applied the update yet. This matters for user experience, consistency expectations, and debugging intermittent 'missing data' reports.",
      analogy: "Read replica lag is like a photocopy machine that's slightly behind. The original document (primary) gets updated immediately, but the photocopier (replica) takes a few seconds to catch up. If you grab a copy right after the original was updated, you might get the old version. For anything time-sensitive, go to the original — not the copy.",
      example: "A user updates their profile, then refreshes a page backed by a read replica. For a few seconds the replica still shows the old value because replication has not caught up yet.",
      followUps: [{ question: "How do you reduce the impact of replica lag?", answer: "Use primary reads for read-after-write critical flows, monitor replica lag, and route only eventually consistent reads to replicas." }],
      keyPoints: ["Replicas can return stale data", "Common with asynchronous replication", "Important for read-after-write behavior", "Route consistency-sensitive reads carefully"]
    },
    {
      id: 341,
      category: "Database", difficulty: 2,
      topic: "5. Schema Design",
      difficulty: "Intermediate",
      question: "How do you perform a zero-downtime database schema change?",
      simpleAnswer: "Use expand-and-contract: add backward-compatible schema first, deploy code that can work with both old and new shapes, migrate data safely, then remove old columns or behavior later.",
      explanation: "Direct destructive changes are risky in production because old and new application versions may coexist during deployment. The safer pattern is: 1) expand schema with nullable/new columns or new tables, 2) deploy code that writes both or reads both, 3) backfill data, 4) switch reads fully to the new shape, and only then 5) contract by removing legacy schema pieces.",
      analogy: "Expand-and-contract is like adding a new lane to a highway while traffic is still flowing. You build the new lane first (add new column), gradually move traffic to it (update app to write both), then close the old lane only after everyone has switched (drop old column). You never shut down the highway — you just carefully redirect traffic.",
      example: "To rename customer_name to full_name, first add full_name, deploy code writing both columns, backfill old rows, switch reads to full_name, then remove customer_name in a later release.",
      followUps: [{ question: "Why are column drops dangerous during rolling deployments?", answer: "Because some running app instances may still expect the old column while newer instances are already using the new schema, causing runtime failures." }],
      keyPoints: ["Prefer expand-and-contract migrations", "Keep changes backward compatible during rollout", "Backfill before removing old schema", "Avoid destructive schema changes in one step"]
    },  ]
};
