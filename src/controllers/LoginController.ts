import { Request, Response } from "express";
import { makeXmlFromJson } from "../utils/functions";
import {parseString} from 'xml2js'
class LoginController {
  public async index(req: Request, res: Response): Promise<Response> {
    const xmlString = `<?xml version='1.0' encoding='UTF-8'?><root>` + await makeXmlFromJson(req.body, '') + '</root>'
    
    return res.set('Content-Type', 'text/xml').send(xmlString);
  }
}

export default new LoginController();
