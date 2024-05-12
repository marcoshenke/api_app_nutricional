import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET = process.env.JWT

export const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')
  if (!token) return res.status(401).json({ error: 'Access denied' })
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.userId = decoded.userId
    next()
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
}
