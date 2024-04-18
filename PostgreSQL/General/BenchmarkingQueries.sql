-- Benchmarking Query execution

EXPLAIN ANALYZE 
SELECT *
FROM users
WHERE username = 'Emil30'