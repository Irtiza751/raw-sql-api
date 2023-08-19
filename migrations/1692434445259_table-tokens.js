/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`CREATE TABLE tokens(
    id SERIAL PRIMARY KEY,
    token TEXT,
    refresh_token TEXT,
    user_id INT REFERENCES users(id) UNIQUE
  )`)
};

exports.down = pgm => {
  pgm.sql(`DROP TABLE tokens;`)
};
