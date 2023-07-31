import jwt from 'jsonwebtoken';

import AuthError from "@app/Auth/exceptions/AuthErrors"
import config from '@/config';

export default class AuthService {
  async signIn(email: string, pass: string): Promise<{ user: object, token: string}> {
    const user = {
      id: '123',
      email: 'user@user.com',
      pass: '123',
      fullName: 'Lucas CherS'
    }

    if (email !== user.email || pass !== user.pass) {
      throw new AuthError('Login ou senha invalidos')
    }

    const { id, fullName } = user

    const token = jwt.sign({ id, fullName }, config.auth.secret, { expiresIn: config.auth.expiresIn})

    return {
      user: {
        id,
        fullName,
        email
      },
      token
    }
  }

  async validateToken(token: string): Promise<string> {
    try {
      const decoded = jwt.verify(token, config.auth.secret) as {
        id: string,
        fullName: string,
      }

      return decoded.id
    } catch(err) {
      throw new AuthError('Invalid Token');
    }
  }
}