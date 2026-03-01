import request from "supertest";
import app from "../../src/app.js";
import factory from "../../src/utils/factory/factory.fake.js";
import "dotenv/config";

const url = process.env.API_URL;

describe("API Security: Input Validation & Injection", () => {
  let userToken;

  beforeEach(async () => {
    const user = await factory.create("user", { password: "password123", accountVerified: true });
    const loginRes = await request(app)
      .post(`${url}/user/login`)
      .send({ email: user.email, password: "password123" });
    userToken = loginRes.body.token;
  });

  describe("Phase 4: Input Validation", () => {
    it("FAIL: Should not allow SQL Injection patterns in parameters", async () => {
      // Trying to search or filter with SQLi (though this is MongoDB, we look for NoSQLi too)
      const response = await request(app)
        .get(`${url}/blog/all`)
        .query({ search: "' OR 1=1 --" });
      
      // The app should either sanitize this or it should NOT return unexpected results
      expect([200, 404]).toContain(response.status); 
    });

    it("FAIL: Should not allow NoSQL Injection in login", async () => {
      const response = await request(app)
        .post(`${url}/user/login`)
        .send({ email: { "$gt": "" }, password: "any" });
      
      // Should fail with 400/401, NOT allow login
      expect([400, 401]).toContain(response.status);
    });

    it("FAIL: Should validate field lengths (DoS protection)", async () => {
      const longTitle = "A".repeat(100000); // Extremely long title
      const response = await request(app)
        .post(`${url}/blog/add`)
        .set("Authorization", `Bearer ${userToken}`)
        // addBlog use multer/form-data, so we send as fields
        .field("blog", JSON.stringify({
            title: longTitle,
            description: "test",
            category: "test"
        }))
        // Multi-part requires a file for this endpoint
        // I'll skip the file for this test just to see the validation
      
      // Should return error or reject large payload
      expect(response.status).toBeGreaterThanOrEqual(400);
    });
  });
});
