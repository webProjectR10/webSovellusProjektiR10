import { expect } from "chai";

const base_url = "http://localhost:3001/";

describe("GET users", () => {
  it("should get all users", async () => {
    const response = await fetch(base_url + "users/");
    const data = await response.json();

    expect(response.status).to.equal(200);
    expect(data).to.be.an("array").that.is.not.empty;
    expect(data[0]).to.include.all.keys(
      "userid",
      "first_name",
      "last_name",
      "email",
      "password"
    );
  });
});

describe("POST register", () => {
  const fName = "joo";
  const lName = "jee";
  const email = "register@foo.com";
  const password = "Register123";

  it("should register with valid email and password", async function () {
    const response = await fetch(base_url + "users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fName: fName,
        lName: lName,
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

    expect(response.status).to.equal(201, data.error);
    expect(data).to.be.an("object");
    expect(data).to.include.all.keys(
      "userid",
      "first_name",
      "last_name",
      "email"
    );
  });
});

describe("POST login", () => {
  const email = "register@foo.com";
  const password = "Register123";
  it("should login with valid credentials", async () => {
    const response = await fetch(base_url + "users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    const data = await response.json();
    expect(response.status).to.equal(200, data.error);
    expect(data).to.be.an("object");
    expect(data).to.include.all.keys(
      "userid",
      "first_name",
      "last_name",
      "email",
      "token"
    );
  });
});
