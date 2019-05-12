import axios from "axios";

export const makeXmlFromJson = async (json, parent) => {   
  let item: any

  for await (item of Object.keys(json)) {
    let element = isNaN(item) ? item : 'element'
    let child = `<${element}>`;
    parent += child;

    if (typeof json[item] === "object") {
      parent = await this.makeXmlFromJson(json[item], parent) + `</${element}>`;
    } else {
      parent += `${json[item]}</${item}>`
    }
  }

  return parent;
};

export const getCookies = async (url) => {
  return await axios.get(url, {withCredentials: true}).then(response => {
    if (response.status === 200) {
      return response.headers['set-cookie']
    } else {
      return null;
    }
  })
}