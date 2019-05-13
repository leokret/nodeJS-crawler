import axios from "axios";
import cheerio from "cheerio";
import qs from "querystring";

/**
 * recursive function to convert json to xml
 * @param json json from request body
 * @param parent initial xml - empty
 * @returns returns string with elements in xml format
 */
export const makeXmlFromJson = async (json, parent) => {
  let item: any;

  for await (item of Object.keys(json)) {
    let element = isNaN(item) ? item : "element";
    let child = `<${element}>`;
    parent += child;

    if (typeof json[item] === "object") {
      parent =
        (await this.makeXmlFromJson(json[item], parent)) + `</${element}>`;
    } else {
      parent += `${json[item]}</${item}>`;
    }
  }

  return parent;
};

export const getCookies = async url => {
  return await axios.get(url, { withCredentials: true }).then(response => {
    if (response.status === 200) {
      return response.headers["set-cookie"];
    } else {
      return null;
    }
  });
};

/**
 * @param html string contains html from login page
 * @returns token generate in form and necessary to request login
 */
export const findItemHtml = (html, element, attr, value) => {
  const htmlParsed = cheerio.load(html);
  const token = htmlParsed(element).attr(attr, value)["1"].attribs.value;

  return token;
};

export const findUsernameprofile = (html) => {
  const htmlParsed = cheerio.load(html);

  return htmlParsed("strong")["0"].children["0"].data;
};

/**
 * @param username username - Login
 * @param password password - Password
 * @param token token generate from login page in html form
 */
export const buildData = (username, password, token) => {
  return {
    commit: "Sign in",
    utf8: "%E2%9C%93",
    authenticity_token: token,
    login: username,
    password: password,
    "webauthn-support": "unsupported"
  };
};

/**
 *
 * @param cookies return object of configurations with header
 */
export const buildConfig = cookies => {
  return {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      cookie: cookies,
      withCredentials: true
    },
    maxRedirects: 0
  };
};

/**
 * @param uriBase base url to request and make login
 * @param data body post
 * @param config configuration predefined for axios
 */
export const makeLogin = async (uriBase, data, config) => {
  return await axios
    .post(uriBase + "session", qs.stringify(data), config)
    .catch(e => {
      if (e.response.status === 302) {
        return e.response.headers["set-cookie"];
      } else {
        return null;
      }
    });
};

export const getHtmlHome = async (cookies, uri, res) => {
  const config = {
    headers: {
      cookie: cookies
    }
  };
  const html = await axios
    .get(uri, config)
    .then(response => {
      if (response) {
        return response;
      } else {
        return res.send("falied to load homepage");
      }
    })
    .catch(e => {
      return res.send("falied to load homepage" + e);
    });

  return html;
};
