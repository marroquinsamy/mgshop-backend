// Import libraries
import { Request, Response } from 'express'
import jwt, { SignOptions } from 'jsonwebtoken'

// Import scripts
import config from '../../config/config'

const signOptions: SignOptions = {
  expiresIn: 60,
}

const createToken = (username: string) => {
  return jwt.sign({ username }, config.jwtSecret, signOptions)
}

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body
  console.log(username, password)

  if (!username || !password)
    res.status(400).json({ message: 'Please send your email and password' })

  if (username !== config.admin.username)
    return res.status(400).json({ message: 'The username does not exist' })

  if (password !== config.admin.password)
    return res.status(400).json({ message: 'The password is incorrect' })

  return res.status(200).json({ token: createToken(username) })
}

const authController = {
  login: login,
}

export default authController
