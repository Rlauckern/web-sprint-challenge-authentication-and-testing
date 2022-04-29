const request = require("supertest");
const db = require("../data/dbConfig");
const server = require("../api/server");

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})


const user1 = {
  id: 1,
  username: "Reed",
  password: "1234"
}

const user2 = {
  id: 1,
  username: "Pickles",
  password: "kitty"
}

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db("users").truncate();
});

afterAll(async () => {
  await db.destroy();
});

describe("POST /Register", () => {
  test("Register a new User", async () => {
    await request(server).post("/api/auth/register").send(user1);
    const user = await db("users").where("username", "Reed").first();
    expect(user).toMatchObject({ username: "Reed" });
  });
  test("Register responds with 'username taken'", async () => {
    await request(server).post("/api/auth/register").send(user1);
    const response = await request(server)
      .post("/api/auth/register")
      .send(user1);
    expect(response.body.message).toMatch("username taken");
  });
});

describe("POST /Login", () => {
  test("Login successful", async () => {
    const res = await request(server)
    .post("/api/auth/login")
    .send(user1);
    expect(res.status).toBe()
    expect(res.body.message).toMatch("welcome, Reed");
  });
  test("Login return error if credentials invalid", async () => {
    const res = await request(server)
    .post("/api/auth/login")
    .send(user2);
    expect(res.status).toBe(401)
    expect(res.body.message).toMatch("invalid credentials");
  });
});