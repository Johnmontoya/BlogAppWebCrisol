import request from "supertest";
import app from "../../src/app.js";
import bcrypt from "bcryptjs";
import factory from "../../src/utils/factory/factory.fake.js";

import "dotenv/config";

const url = process.env.API_URL;

let user;
let blog;
let login;

beforeEach(async () => {
  user = await factory.create("user", {
    password: bcrypt.hashSync("pacoelflaco", 10),
  });

  // Crear un blog
  blog = await factory.create("blog", { author: user._id, isPublished: true });

  // Hacer login
  login = await request(app)
    .post(`${url}/user/login`)
    .set("content-type", "application/json")
    .send({
      email: user.email,
      password: "pacoelflaco",
    });
});

describe("Blog controllers", () => {
  it(`Deberia de obtener todos los blogs de la base de datos`, async () => {
    const response = await request(app)
      .get(`${url}/blog/all`)
      .set("content-type", "application/json");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("blogs");
    expect(Array.isArray(response.body.blogs)).toBe(true);
    expect(response.body.blogs.length).toBeGreaterThan(0);
    expect(response.body.blogs.length).toBe(1);
  });

  it(`Deberia retornar a un blog en la base de datos`, async () => {
    const response = await request(app)
      .get(`${url}/blog/${blog._id}`)
      .set("content-type", "application/json");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("blog");
    expect(typeof response.body.blog).toBe("object");
    expect(response.body.blog._id).toBe(blog._id.toString());
  });

  it(`Deberia poder cambiar el estado del blog para su publicacion`, async () => {
    const response = await request(app)
      .put(`${url}/blog/toggle-publish`)
      .set("Authorization", `Bearer ${login.body.token}`)
      .set("content-type", "application/json")
      .send({
        id: blog._id,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  });
});
