CREATE DATABASE uno_clone;

CREATE TABLE uno_cards(
    card_id SERIAL PRIMARY KEY NOT NULL,
    color VARCHAR(45) NOT NULL,
    values NUMERIC NOT NULL,
    image_file VARCHAR(255) NOT NULL
);