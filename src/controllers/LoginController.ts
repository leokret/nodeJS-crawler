
import { Request, Response } from 'express'

class LoginController {
  public async index (req: Request, res: Response): Promise<Response> {
    return res.json('initial')
  }
}

export default new LoginController()
