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
      const { search, location, minPrice, maxPrice, page = 1, limit = 10 } = req.query
      let queryText = 'SELECT * FROM listings WHERE 1=1'
      const params = []
      let paramIndex = 1

      if (search) {
        queryText += ` AND title ILIKE $${paramIndex}`
        params.push(`%${search}%`)
        paramIndex++
      }
      if (location) {
        queryText += ` AND location ILIKE $${paramIndex}`
        params.push(`%${location}%`)
        paramIndex++
      }
      if (minPrice) {
        queryText += ` AND price >= $${paramIndex}`
        params.push(Number(minPrice))
        paramIndex++
      }
      if (maxPrice) {
        queryText += ` AND price <= $${paramIndex}`
        params.push(Number(maxPrice))
        paramIndex++
      }

      queryText += ' ORDER BY created_at DESC'
      const offset = (Number(page) - 1) * Number(limit)
      queryText += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`
      params.push(Number(limit), offset)

      const result = await query(queryText, params)
      // Get total count for pagination
      let countQuery = 'SELECT COUNT(*) FROM listings WHERE 1=1'
      const countParams = []
      let countIndex = 1
      if (search) {
        countQuery += ` AND title ILIKE $${countIndex}`
        countParams.push(`%${search}%`)
        countIndex++
      }
      if (location) {
        countQuery += ` AND location ILIKE $${countIndex}`
        countParams.push(`%${location}%`)
        countIndex++
      }
      if (minPrice) {
        countQuery += ` AND price >= $${countIndex}`
        countParams.push(Number(minPrice))
        countIndex++
      }
      if (maxPrice) {
        countQuery += ` AND price <= $${countIndex}`
        countParams.push(Number(maxPrice))
        countIndex++
      }
      const countResult = await query(countQuery, countParams)
      const total = Number(countResult.rows[0].count)

      res.json({ listings: result.rows, total, page: Number(page), limit: Number(limit) })
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

// Allow GET without auth; require auth for non-GET methods
export default async function (req, res) {
  if (req.method === 'GET') return handler(req, res)
  return requireAuth(handler)(req, res)
}
