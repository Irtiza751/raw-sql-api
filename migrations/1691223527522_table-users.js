/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    bio VARCHAR(255)
  );
  `)
};

exports.down = pgm => {
  pgm.sql(`DROP TABLE users;`)
};
