CREATE TABLE uno_leaderboard (
  id SERIAL PRIMARY KEY,
  userid INTEGER NOT NULL REFERENCES players(userid),
  score INTEGER NOT NULL DEFAULT 0,
  game_status INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO
  uno_leaderboard (userid, score, game_status)
VALUES
  (17, 5975, 1),
  (26, 2311, 1),
  (27, 2122, 0),
  (28, 100, 0),
  (29, 0, 0),
  (30, 3441, 1),
  (31, 11, 0),
  (15, 211, 0),
  (33, 222, 0),
  (17, 5990, 1),
  (26, 2312, 1),
  (27, 2123, 0),
  (28, 101, 0),
  (29, 1, 0),
  (30, 3442, 1),
  (31, 12, 0),
  (15, 212, 0),
  (33, 223, 0),
  (17, 5991, 1),
  (26, 2313, 1),
  (27, 2124, 0),
  (28, 102, 0),
  (29, 2, 0),
  (30, 3443, 1),
  (31, 13, 0),
  (15, 213, 0),
  (33, 224, 0);

CREATE TABLE player_stat (
  id SERIAL PRIMARY KEY,
  userid INTEGER NOT NULL REFERENCES players(userid),
  wins INTEGER NOT NULL DEFAULT 0,
  losses INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO
  player_stat (userid, wins, losses)
VALUES 
  (17, 2, 1),
  (30, 1, 2),
  (26, 0, 2),
  (27, 1, 2),
  (33, 3, 0),
  (15, 0, 3),
  (28, 0, 3),
  (31, 0, 3),
  (29, 0, 3);

