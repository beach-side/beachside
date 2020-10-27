INSERT INTO users
(name, email, hash)
VALUES($1,$2,$3)
returning id, name, email;