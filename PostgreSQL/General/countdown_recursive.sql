-- Recursive CTE - COUNTDOWN

WITH RECURSIVE countdown(val) AS (
	SELECT 3 AS val		-- initial, NON Recursive Query
	UNION
	SELECT val - 1 FROM countdown WHERE val > 1			-- Recursive Query
)

SELECT *
FROM countdown;