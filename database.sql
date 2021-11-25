CREATE DATABASE uno_clone;

CREATE TABLE uno_cards(
    card_id SERIAL PRIMARY KEY NOT NULL,
    color VARCHAR(45) NOT NULL,
    values NUMERIC NOT NULL,
    image_file VARCHAR(255) NOT NULL
);
CREATE TABLE players(
    userid SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(45) NOT NULL,
    email NUMERIC NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_by TIMESTAMP NOT NULL DEFAULT current_timestamp
);
CREATE TABLE uno_leaderboard(
    id SERIAL PRIMARY KEY NOT NULL,
    userid INT NOT NULL,
    score NUMERIC NOT NULL,
    created_by TIMESTAMP NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_userid 
        FOREIGN KEY(userid)
        REFERENCES players(userid) ON DELETE CASCADE
);

ALTER TABLE uno_leaderboard DROP CONSTRAINT fk_userid;
ALTER TABLE uno_leaderboard ADD CONSTRAINT  fk_userid
uno_clone-#         FOREIGN KEY(userid)
uno_clone-#         REFERENCES players(userid) ON DELETE CASCADE;