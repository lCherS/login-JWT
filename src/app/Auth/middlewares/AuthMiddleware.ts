import { Request, Response, NextFunction } from "express";
import AuthService from "@app/Auth/services/AuthServices";
import AuthError from "@app/Auth/exceptions/AuthErrors";

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  
  if(!authHeader) return res.status(401).json({error: 'no token provided'});

  // Authorization: Bearer <token>
  const [, token] = authHeader.split(' ');

  // if(token !== '123456') return res.status(401).json({error: 'token invalid'});
  const authService = new AuthService();
  try {
    const id = await authService.validateToken(token);

    req.user = { id, token};
  } catch(err) {
    if(err instanceof AuthError) res.status(401).send();
  }
  return next();
}
