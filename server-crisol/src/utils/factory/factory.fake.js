import { factory } from "factory-girl";
import { faker } from '@faker-js/faker';
import User from "../../models/User-model.js"; // Agregar .js

factory.define("user", User, {
  username: factory.seq((n) => `${faker.person.firstName()}${n}`),
  email: factory.seq(
    (n) => `test${n}_${faker.internet.email({ allowSpecialCharacters: false })}`
  ),
  password: () => faker.internet.password(), // Agregar password por defecto
  role: "User",
  accountVerified: false,
  otp: 0
});

export default factory;