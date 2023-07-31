import { Request, Response } from "express";

import AuthService from "@app/Auth/services/AuthServices";
import AuthError from "@app/Auth/exceptions/AuthErrors";

class AuthController {
  async create(req: Request, res: Response): Promise<Response> {
    const { email, pass } = req.body;
    try {
      const authService = new AuthService();
      const {user, token} = await authService.signIn(email, pass);

      return res.status(200).json({user, token})
    } catch(error) {
      if (error instanceof AuthError) {
        return res.status(401).send();
      }
       return res.status(500).json({error});
    }
  }

  async destroy() {

  }
}

export default new AuthController();