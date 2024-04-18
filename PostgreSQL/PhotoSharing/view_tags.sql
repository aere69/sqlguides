CREATE VIEW tags AS (
	SELECT id, created_at, user_id, post_id, 'Photo_Tag' AS type FROM  photo_tags
	UNION ALL
	SELECT id, created_at, user_id, post_id, 'Caption_Tag' AS type FROM caption_tags
);