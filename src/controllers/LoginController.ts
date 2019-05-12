import { Request, Response } from "express";
import { makeXmlFromJson, getCookies } from "../utils/functions";

class LoginController {
  public async parseJson(req: Request, res: Response) {
    const xmlString =
      `<?xml version='1.0' encoding='UTF-8'?><root>` +
      (await makeXmlFromJson(req.body, "")) +
      "</root>";

    return res.set("Content-Type", "text/xml").send(xmlString);
  }

  public async getCookie(req , res: Response) {
    const cookies = await getCookies("https://github.com/session");
    return res.send(cookies);
  }
}

export default new LoginController();
