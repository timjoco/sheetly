import db from '../configs/DBConfig.ts';

async function createTable() {
  try {
    await db.none(`
      CREATE TABLE IF NOT EXISTS uploadedPDFs (
        id uuid DEFAULT uuid_generate_v4 (),
        title TEXT,
        uploader TEXT,
        PRIMARY KEY (id)
      );
    `);

    console.log('Table "uploadedPDFs" created.');
  } catch (error) {
    console.error('Error creating table:', error);
  }
}

createTable();
