import { query, initDb } from '../../../lib/db'
import { requireAuth } from '../../../lib/auth'

async function handler(req, res) {
  try {
    await initDb()
  } catch (err) {
    console.error('DB init failed:', err.message)
    // continue; queries will surface errors if DB isn't available
  }
  if (req.method === 'GET') {
    try {
      const result = await query('SELECT * FROM listings ORDER BY created_at DESC LIMIT 100')
      res.json({ listings: result.rows })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
    return
  }

  if (req.method === 'POST') {
    const { title, price, location, image, description } = req.body || {}
    if (!title || !price) return res.status(400).json({ error: 'title and price required' })
    try {
      const result = await query(
        'INSERT INTO listings(title, price, location, image, description) VALUES($1,$2,$3,$4,$5) RETURNING *',
        [title, price, location || null, image || null, description || null]
      )
      res.status(201).json({ listing: result.rows[0] })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
    return
  }

  res.setHeader('Allow', ['GET', 'POST'])
  res.status(405).end('Method Not Allowed')
}

export default requireAuth(handler)
