import { signToken } from '../../../lib/auth'

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end('Method Not Allowed')
  }

  const { username } = req.body || {}
  if (!username) return res.status(400).json({ error: 'username required' })

  // Demo login — in production validate credentials against users table
  const token = signToken({ user: { username } })
  res.json({ token })
}
