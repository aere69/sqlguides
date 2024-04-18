-- Username and captions of all
-- the posts of Username with ID = 200

SELECT username,
	   caption
  FROM users
  JOIN posts ON user.id = posts.user_id
 WHERE users.id = 200