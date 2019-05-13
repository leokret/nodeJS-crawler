import { Request, Response } from "express";
import {
  findItemHtml,
  getCookies,
  buildData,
  buildConfig,
  makeLogin,
  getHtmlHome,
  findUsernameprofile
} from "../utils/functions";
import axios from "axios";

class LoginController {
  public async makeLogin(req: Request, res: Response) {
    const { username, password } = req.body;
    const uriBase = "https://github.com/";
    let cookies = await getCookies(uriBase + "login");
    const token = await axios.get(uriBase + "login").then(response => {
      cookies = response.headers["set-cookie"];
      return findItemHtml(response.data, "input", "name", "authenticity_token");
    });
    const data = buildData(username, password, token);
    const config = buildConfig(cookies);

    cookies = await makeLogin(uriBase, data, config);

    const htmlHomePage = (await getHtmlHome(cookies, uriBase, res)).data;

    return res.send(findUsernameprofile(htmlHomePage));
  }
}

export default new LoginController();
