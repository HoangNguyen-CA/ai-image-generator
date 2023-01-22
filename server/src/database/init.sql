CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    auth_id TEXT UNIQUE NOT NULL
);

CREATE TABLE images (
    image_id SERIAL PRIMARY KEY,
    image_url TEXT NOT NULL,
    user_id INT NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES users(user_id)
            ON DELETE CASCADE
);