-- Materialized view.
-- A slow query - Takes long to create
-- Values that do not change very often.

CREATE MATERIALIZED VIEW weekly_likes AS (
SELECT 
	date_trunc('week', COALESCE(post.created_at,comment.created_at)) AS week,
	COUNT(posts.id) AS num_likes_for_posts,
	COUNT(comments.id) AS num_likes_for_comments
FROM likes
LEFT JOIN posts ON posts.id = likes.post_id
LEFT JOIN comments ON comment.id = likes.comment_id
GROUP BY week
ORDER BY week
) WITH DATA;

-- can use now stored results with regular selects.

-- to refresh the stored data
REFRESH MATERIALIZED VIEW weekly_likes;

