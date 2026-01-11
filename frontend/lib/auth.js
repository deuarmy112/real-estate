import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (err) {
    return null
  }
}

export function requireAuth(handler) {
  return async (req, res) => {
    const auth = req.headers.authorization || ''
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : auth
    const payload = verifyToken(token)
    if (!payload) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }
    req.user = payload
    return handler(req, res)
  }
}
