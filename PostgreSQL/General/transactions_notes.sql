-- Transactions

BEGIN;

UPDATE accounts SET balance = balance - 50 WHERE name = 'Gia';
UPDATE accounts SET balance = balance + 50 WHERE name = 'Alice';

COMMIT; 	-- UPDATE the database with all of the above.

ROLLBACK;   -- DISCARD the above changes. In case there was an error in between.