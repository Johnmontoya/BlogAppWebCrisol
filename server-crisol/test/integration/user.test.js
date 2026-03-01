import request from "supertest";
import app from "../../src/app.js";
import bcrypt from "bcryptjs";
import User from "../../src/models/User-model.js";
import factory from "../../src/utils/factory/factory.fake.js";

import "dotenv/config";

const url = process.env.API_URL;

let user;
let login;

beforeEach(async () => {
  // Crear usuario con password hasheado
  user = await factory.create("user", {
    password: bcrypt.hashSync("pacoelflaco", 10),
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

describe("User controllers", () => {
  it(`Deberia obtener todos los usuarios registrados en la base de datos`, async () => {
    const response = await request(app)
      .get(`${url}/user/users`)
      .set("content-type", "application/json");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("users");
    expect(Array.isArray(response.body.users)).toBe(true);
    expect(response.body.users.length).toBeGreaterThan(0);
    expect(response.body.users.length).toBe(1);
  });

  it("Deberia retornar un mensaje cuando no hay usuarios", async () => {
    // Limpiar la base de datos para este test especifico
    await User.deleteMany({});

    const response = await request(app)
      .get(`${url}/user/users`)
      .set("content-type", "application/json");

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toBe(
      "No hay usuarios registrados en la base de datos."
    );
  });

  it("Deberia retornar a un usuario en la base de datos", async () => {
    const response = await request(app)
      .get(`${url}/user/user/${user._id}`)
      .set("content-type", "application/json");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("user");
    expect(typeof response.body.user).toBe("object");
    expect(response.body.user._id).toBe(user._id.toString());
  });

  it("Deberia el usuario poder loguear con sus credenciales y retornar un token", async () => {
    const login = await request(app)
      .post(`${url}/user/login`)
      .set("content-type", "application/json")
      .send({
        email: user.email,
        password: "pacoelflaco",
      });

    expect(login.status).toBe(200);
    expect(login.headers).toHaveProperty("token");
    expect(login.body.token).toBeTruthy();
  });

  it("Deberia eliminar el usuario guardado en la base de datos", async () => {
    const response = await request(app)
      .delete(`${url}/user/user/${user._id}`)
      .set("Authorization", `Bearer ${login.body.token}`)
      .set("content-type", "application/json");

    expect(response.statusCode).toBe(200);
    expect(response.body.valid).toBe("success");
    expect(response.body.message).toBe("Cuenta eliminada");
  });
});
