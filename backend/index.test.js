import { expect } from "chai";
import { initializeTestDb } from "./helpers/test.js";

const base_url = "http://localhost:3001/";

describe("POST register", () => {
  before(() => {
    initializeTestDb();
  });

  const fName = "joo";
  const lName = "jee";
  const email = "register@foo.com";
  const password = "Register123";
  const badPassword = "register";

  it("should not register with invalid password", async function () {
    const response = await fetch(base_url + "users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fName: fName,
        lName: lName,
        email: email,
        password: badPassword,
      }),
    });

    const data = await response.json();

    expect(response.status).to.equal(225, data.error);
    expect(data).to.be.an("object");
    expect(data).to.include.all.keys("error");
  });
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

let authToken;
describe("POST login", () => {
  const email = "register@foo.com";
  const password = "Register123";
  const wrongPassword = "register";

  it("should not login with wrong password", async () => {
    const response = await fetch(base_url + "users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: wrongPassword }),
    });
    const data = await response.json();
    expect(response.status).to.equal(401);
    expect(data).to.be.an("object");
    expect(data).to.include.all.keys("error");
  });
  it("should login with valid credentials", async () => {
    const response = await fetch(base_url + "users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    const data = await response.json();
    authToken = data.token;
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

describe("Log out", () => {
  it("Should log out", async () => {
    const response = await fetch(base_url + "users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    const data = await response.json();
    expect(response.status).to.equal(200);
    expect(data).to.be.an("object");
    expect(data.message).to.equal("successfully logged out");
  });
});

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
      "email"
    );
  });
  it("should get one user by id", async () => {
    const response = await fetch(base_url + "users/1");
    const data = await response.json();

    expect(response.status).to.equal(200);
    expect(data).to.be.an("array").that.is.not.empty;
    expect(data[0]).to.include.all.keys(
      "userid",
      "first_name",
      "last_name",
      "email"
    );
  });
});

describe("DELETE user", () => {
  it("Should delete user", async () => {
    const response = await fetch(base_url + "users/delete/1", {
      method: "DELETE",
    });
    const data = await response.json();
    expect(response.status).to.equal(200);
    expect(data).to.equal("user deleted");
  });
});
