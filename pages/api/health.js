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
    console.error('DB check failed:', err.message)
    res.json({ status: 'ok', db: 'disconnected', note: 'App can run with mock data' })
  }
}