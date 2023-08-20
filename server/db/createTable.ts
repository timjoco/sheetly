import db from '../configs/DBConfig.ts';

async function createTable() {
  try {
    await db.none(`
      CREATE TABLE IF NOT EXISTS pdfs (
        id SERIAL PRIMARY KEY,
        title TEXT,
        uploader TEXT,
        file_path TEXT
      );
    `);
    console.log('Table "pdfs" created.');
  } catch (error) {
    console.error('Error creating table:', error);
  }
}

createTable();
