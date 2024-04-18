-- Most popular user
-- User who is tagged the most

WITH tags AS (
	SELECT user_id FROM photo_tags
	UNION ALL
	SELECT user_id FROM caption_tags
)
SELECT username, COUNT(*)
FROM users
JOIN tags ON users.id = tags.user_id
GROUP BY username
ORDER BY COUNT(*) DESC