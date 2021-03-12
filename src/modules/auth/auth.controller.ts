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
  console.log(username, password)

  setTimeout(() => {
    try {
      if (!username || !password)
        return res.status(400).json({
          message: 'Por favor envía tu nombre de usuario y tu contraseña',
        })

      if (
        username !== config.admin.username ||
        password !== config.admin.password
      )
        return res.status(400).json({ message: 'Credenciales incorrectos' })
    } catch (error) {
      console.log(error)
    }

    return res.status(200).json({ token: createToken(username) })
  }, 3000)
}

interface IAuthController {
  login(req: Request, res: Response): void
}

const authController: IAuthController = {
  login,
}

export default authController
