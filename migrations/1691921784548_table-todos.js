/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    user_id INTEGER REFERENCES users(id)
  );
  `)
};

exports.down = pgm => {
  pgm.sql(`DROP TABLE todos;`)
};
