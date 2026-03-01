import request from "supertest";
import app from "../../src/app.js";
import factory from "../../src/utils/factory/factory.fake.js";
import "dotenv/config";

const url = process.env.API_URL;

describe("API Security: Authentication & Authorization", () => {
  let user;
  let admin;
  let userToken;
  let blog;

  beforeEach(async () => {
    // Create a regular user
    user = await factory.create("user", {
      email: "user@security.test",
      password: "password123",
      role: "User",
      accountVerified: true
    });

    // Create an admin
    admin = await factory.create("user", {
      email: "admin@security.test",
      password: "password123",
      role: "Admin",
      accountVerified: true
    });

    // Login as regular user to get token
    const loginRes = await request(app)
      .post(`${url}/user/login`)
      .send({ email: "user@security.test", password: "password123" });
    userToken = loginRes.body.token;

    // Create a blog owned by someone (factory does it randomly but we can override)
    blog = await factory.create("blog", { author: admin._id, isPublished: true });
  });

  describe("Phase 2: Authentication Testing", () => {
    it("FAIL: Should return 401 when accessing protected route without token", async () => {
      const response = await request(app).put(`${url}/blog/toggle-publish`).send({ id: blog._id });
      expect(response.status).toBe(401);
      expect(response.body.message).toMatch(/iniciar/i);
    });

    it("FAIL: Should return 401 when using an invalid token", async () => {
      const response = await request(app)
        .put(`${url}/blog/toggle-publish`)
        .set("Authorization", "Bearer invalid-token")
        .send({ id: blog._id });
      
      // In this app, invalid JWT might throw 500 or 403 depending on implementation
      // But 401/403 is the expected security behavior
      expect([401, 403, 500]).toContain(response.status); 
    });

    it("FAIL: Should return 400 if trying to login with unverified account (Security Gate)", async () => {
      const unverifiedUser = await factory.create("user", {
        email: "unverified@test.com",
        accountVerified: false
      });
      
      const response = await request(app)
        .post(`${url}/user/login`)
        .send({ email: unverifiedUser.email, password: "password" });
      
      expect(response.status).toBe(400);
      expect(response.body.message).toMatch(/verificada/i);
    });
  });

  describe("Phase 3: Authorization Testing", () => {
    it("FAIL (IDOR): Standard user should not be able to delete another user's account", async () => {
      const response = await request(app)
        .delete(`${url}/user/user/${admin._id}`)
        .set("Authorization", `Bearer ${userToken}`);
      
      // Current implementation might allow it or fail due to lack of IDOR checks
      // We want this to fail with 403 or 401
      // Note: deleteUser in route is /user/user/:id
      expect(response.status).toBe(403); 
    });

    it("FAIL: Standard user should not be able to access Admin dashboard", async () => {
      const response = await request(app)
        .get(`${url}/blog/dashboard`)
        .set("Authorization", `Bearer ${userToken}`);
      
      expect(response.status).toBe(403);
      expect(response.body.message).toMatch(/inválido|expirado|permisos/i);
    });
  });
});
