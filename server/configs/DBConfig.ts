import pgPromise from 'pg-promise';

const pgp = pgPromise();
const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'yourdatabase',
  user: 'sheetly',
  password: 'sheetly',
});

export default db;
