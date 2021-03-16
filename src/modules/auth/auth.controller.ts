// Import libraries
import { Request, Response } from 'express'
import jwt, { SignOptions } from 'jsonwebtoken'

// Import scripts
import config from '../../config/config'

const signOptions: SignOptions = {
  expiresIn: 3000,
}

const createToken = (username: string) => {
  return jwt.sign({ username }, config.jwtSecret, signOptions)
}

const login = (req: Request, res: Response) => {
  const { username, password } = req.body

  if (
    !username ||
    !password ||
    username !== config.admin.username ||
    password !== config.admin.password
  ) {
    return res.status(400).json({ message: 'Bad credentials.' })
  }

  return res.status(200).json({ token: createToken(username) })
}

interface IAuthController {
  login(req: Request, res: Response): void
}

const authController: IAuthController = {
  login,
}

export default authController
