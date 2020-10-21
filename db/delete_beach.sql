DELETE FROM favorite_beaches
WHERE id = $1 AND user_id = $2;