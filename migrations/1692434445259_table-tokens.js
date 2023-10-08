/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`CREATE TABLE tokens(
    id SERIAL PRIMARY KEY,
    token TEXT,
    refresh_token TEXT,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE (user_id)
  )`);
};

exports.down = (pgm) => {
  pgm.sql(`DROP TABLE tokens;`);
};
