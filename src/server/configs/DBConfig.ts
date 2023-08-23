import pgPromise from 'pg-promise';

// this file is used to configure the db login and set up information
const pgp = pgPromise();
const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'sheetly',
  user: 'sheetly',
  password: 'sheetly',
});

export default db;
