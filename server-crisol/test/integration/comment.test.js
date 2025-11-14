import request from "supertest";
import app from "../../src/app.js";
import bcrypt from "bcryptjs";
import factory from "../../src/utils/factory/factory.fake.js";

import "dotenv/config";

const url = process.env.API_URL;

let user;
let blog;
let comment;
let login;

beforeEach(async () => {
  user = await factory.create("user", {
    password: bcrypt.hashSync("pacoelflaco", 10),
  });

  // Crear un blog
  blog = await factory.create("blog");

  comment = await factory.create("comment", {
    blog: blog._id,
    isApproved: true,
  });

  // Hacer login
  login = await request(app)
    .post(`${url}/user/login`)
    .set("content-type", "application/json")
    .send({
      email: user.email,
      password: "pacoelflaco",
    });
});

describe("Comment controllers", () => {
  it(`Deberia poder guardar el nuevo comentario al blog especifico`, async () => {
    const response = await request(app)
      .post(`${url}/comment/add-comment`)
      .set("content-type", "application/json")
      .set("Authorization", `Bearer ${login.body.token}`)
      .send({
        blog: blog._id,
        name: comment.name,
        content: comment.content,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.valid).toBe("success");
    expect(response.body.message).toBe("Comentario agregado");
  });

  it(`Deberia obtener todos los comentarios de un blog especifico de la base de datos`, async () => {
    const response = await request(app)
      .get(`${url}/comment/blog`)
      .set("content-type", "application/json")
      .query({
        id: blog._id.toString(),
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("comments");
    expect(Array.isArray(response.body.comments)).toBe(true);
    expect(response.body.comments.length).toBeGreaterThan(0);
    expect(response.body.comments.length).toBe(1);
  });

  it(`Deberia obtener todos los comentarios de la base de datos`, async () => {
    const response = await request(app)
      .get(`${url}/comment/comments/all`)
      .set("content-type", "application/json");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("comments");
    expect(Array.isArray(response.body.comments)).toBe(true);
    expect(response.body.comments.length).toBeGreaterThan(0);
    expect(response.body.comments.length).toBe(1);
  });

  it(`Deberia poder cambiar el estado del comentario`, async () => {
    const response = await request(app)
      .put(`${url}/comment/approve-comment`)
      .set("content-type", "application/json")
      .send({
        id: comment._id,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  });

  it(`Deberia eliminar un comentario guardado en la base de datos por su ID`, async () => {
    const response = await request(app)
      .delete(`${url}/comment/delete-comment`)
      .set("Authorization", `Bearer ${login.body.token}`)
      .set("content-type", "application/json")
      .send({
        id: comment._id,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.valid).toBe("success");
    expect(response.body.message).toBe("Comentario eliminado");
  });
});
