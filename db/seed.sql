CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(50),
    hash TEXT
);

CREATE TABLE favorite_beaches(
id SERIAL PRIMARY KEY, 
beach_name TEXT,
lat VARCHAR,
lng VARCHAR,
user_id INT REFERENCES users (id)
);