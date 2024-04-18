-- number of likes a user has created

  SELECT username,
	     COUNT(*)
    FROM users
    JOIN likes ON likes.user_id = users.id
GROUP BY username