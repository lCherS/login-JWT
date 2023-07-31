import { Request, Response } from "express";

class usersController {
  async index(req: Request, res: Response): Promise<Response> {
    const users = [
      {id: '456', email: 'jon@email.com', pass: 'pass', fullName: 'jon jon'},
      {id: '123', email: 'user@user.com', pass: '123', fullName: 'Lucas CherS'},
      {id: '789', email: 'email@email', pass: 'tst', fullName: 'teste user'},
    ]
    return res.status(200).json(users);
  }
}

export default new usersController();