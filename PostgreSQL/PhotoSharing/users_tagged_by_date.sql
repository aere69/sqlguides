-- usernames of users tagged on caption or photo
-- before a given date
-- Tables : users | photo_tags | caption_tags

WITH tags AS (
	SELECT user_id, created_at FROM photo_tags
	UNION ALL
	SELECT user_id, created_at FROM caption_tags
)

SELECT users.username, tags.created_at
FROM users
JOIN tags ON users.id = tags.user_id
WHERE tags.created_at < '2024-11-01'
