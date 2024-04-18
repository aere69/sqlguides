-- PostgreSQL - SPECIFIC

-- Where data/databases is stored
SHOW data_directory

-- Identifier for each database
SELECT oid, datname
FROM pg_database;

-- Identify objects for each database.
SELECT * FROM pg_class;

-- Size of database file on HD
SELECT pg_size_pretty(pg_relation_size('users'));
SELECT pg_size_pretty(pg_relation_size('users_username_idx'));

-- Find indexes
SELECT relname, relkind
FROM pg_class
WHERE relkind = 'i';

-- Statistics on values of tables
SELECT *
FROM pg_stats
WHERE tablename = 'users';




