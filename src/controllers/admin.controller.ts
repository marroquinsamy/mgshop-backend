// Import libraries
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

// Import scripts
import config from '../config/config'

const createToken = (username: string) => {
  return jwt.sign(username, config.jwtSecret, { expiresIn: 84600 })
}

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body

  if (!username || !password)
    res.status(400).json({ message: 'Please send your email and password' })

  if (username !== config.admin.username)
    return res.status(400).json({ message: 'The username does not exist' })

  if (password !== config.admin.password)
    return res.status(400).json({ message: 'The password is incorrect' })

  return res.status(200).json({ token: createToken(username) })
}
