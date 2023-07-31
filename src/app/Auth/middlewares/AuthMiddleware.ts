import { Request, Response, NextFunction } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  
  if(!authHeader) return res.status(401).json({error: 'no token provided'});

  // Authorization: Bearer <token>
  const [, token] = authHeader.split(' ');

  if(token !== '123456') return res.status(401).json({error: 'token invalid'});

  return next();
}
