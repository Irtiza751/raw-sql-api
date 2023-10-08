/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(
    `ALTER TABLE todos
      DROP CONSTRAINT todos_user_id_fkey,
      ADD CONSTRAINT todos_user_id_cascade_fkey
        FOREIGN KEY (id)
        REFERENCES users(id)
        ON DELETE CASCADE;`
  );
};

exports.down = (pgm) => {
  pgm.sql(`DROP CONSTRAINT todos_user_id_cascade_fkey`);
};
