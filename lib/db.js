import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL

const pool = new Pool({
  connectionString,
  ssl: connectionString ? { rejectUnauthorized: false } : false,
})

async function initDb() {
  const createTable = `
    CREATE TABLE IF NOT EXISTS listings (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      price NUMERIC NOT NULL,
      location TEXT,
      image TEXT,
      description TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `
  try {
    await pool.query(createTable)
  } catch (err) {
    // if the DB isn't available, we'll surface errors from individual queries
    console.error('initDb error:', err.message)
  }
}

initDb()

export async function query(text, params) {
  return pool.query(text, params)
}

export default pool
