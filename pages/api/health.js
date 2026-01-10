import { query } from '../../lib/db'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).end('Method Not Allowed')
  }

  try {
    // Simple query to check DB connection
    await query('SELECT 1')
    res.json({ status: 'ok', db: 'connected' })
  } catch (err) {
    res.status(500).json({ status: 'error', db: 'disconnected', error: err.message })
  }
}