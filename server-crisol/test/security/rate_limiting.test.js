import request from "supertest";
import app from "../../src/app.js";
import "dotenv/config";
process.env.ENABLE_RATE_LIMIT_TEST = 'true';

const url = process.env.API_URL;

describe("API Security: Rate Limiting", () => {
  it("FAIL: Should return 429 after exceeding the rate limit on login", async () => {
    // We configured a limit of 5 requests per hour for login
    // We will fire 6 requests quickly
    const loginData = { email: "test@rate.limit", password: "wrong-password" };
    
    // First 5 requests
    for (let i = 0; i < 5; i++) {
      await request(app).post(`${url}/user/login`).send(loginData);
    }
    
    // The 6th request should be blocked
    const response = await request(app).post(`${url}/user/login`).send(loginData);
    
    expect(response.status).toBe(429);
    expect(response.body.message).toMatch(/demasiados intentos/i);
  });
});
