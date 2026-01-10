import { query } from '../../../lib/db'
import { requireAuth } from '../../../lib/auth'

async function handler(req, res) {
  const { id } = req.query

  if (req.method === 'GET') {
    try {
      const result = await query('SELECT * FROM listings WHERE id=$1', [id])
      if (!result.rows.length) return res.status(404).json({ error: 'Not found' })
      res.json({ listing: result.rows[0] })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
    return
  }

  if (req.method === 'PUT') {
    const { title, price, location, image, description } = req.body || {}
    try {
      const result = await query(
        'UPDATE listings SET title=$1, price=$2, location=$3, image=$4, description=$5 WHERE id=$6 RETURNING *',
        [title, price, location, image, description, id]
      )
      if (!result.rows.length) return res.status(404).json({ error: 'Not found' })
      res.json({ listing: result.rows[0] })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
    return
  }

  if (req.method === 'DELETE') {
    try {
      await query('DELETE FROM listings WHERE id=$1', [id])
      res.status(204).end()
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
    return
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
  res.status(405).end('Method Not Allowed')
}

export default requireAuth(handler)
