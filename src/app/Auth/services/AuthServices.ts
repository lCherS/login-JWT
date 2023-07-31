import jwt from 'jsonwebtoken';

import AuthError from "@app/Auth/exceptions/AuthErrors"
import config from '@/config';
import { getValue, setValue } from '@/lib/redis';

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

  async signOut(token: string): Promise<void> {
    await this.blackListToken(token)
  }

  async validateToken(token: string): Promise<string> {
    try {

      if( await this.isTokenBlackListed(token) ) throw new AuthError('token was blacklisted');
      
      const decoded = jwt.verify(token, config.auth.secret) as {
        id: string,
        fullName: string,
      }

      return decoded.id
    } catch(err) {
      throw new AuthError('Invalid Token');
    }
  }

  private async isTokenBlackListed(token:string): Promise<boolean> {
    const blackListedToken = await getValue(`tokens:invalidated:${token}`)

    return !!blackListedToken;
  }

  private async blackListToken(token:string): Promise<void> {
    await setValue(`tokens:invalidated:${token}`, true);
  }
}