import { makeXmlFromJson } from "../utils/functions";

describe("Parse json to xml", () => {
  it("compare xml converted to expected xml elements", async () => {
    const account = {
      login: "user",
      password: "password"
    };
    const expected = "<login>user</login><password>password</password>";

    expect(await makeXmlFromJson(account, "")).toEqual(expected);
  });

  it("check parse with json contains array and objects", async () => {
    const account = {
      login: "user",
      password: "password",
      array: [
        {
          name: "testing"
        },
        {
          name: "testing"
        }
      ],
      object: {
        field1: "pass",
        field2: "fail"
      }
    };
    const expected = "<login>user</login><password>password</password><array><element><name>testing</name></element><element><name>testing</name></element></array><object><field1>pass</field1><field2>fail</field2></object>";

    expect(await makeXmlFromJson(account, "")).toEqual(expected);
  });
});
