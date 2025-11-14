import { factory } from "factory-girl";
import { faker } from '@faker-js/faker';
import User from "../../models/User-model.js"; // Agregar .js
import Blog from "../../models/Blog-model.js";

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

factory.define("blog", Blog, {
  title: () => faker.book.title(),
  subTitle: () => faker.company.buzzNoun(),
  description: () => faker.lorem.words(),
  category: () => faker.book.genre(),
  image: () => faker.image.avatar(),
  isPublished: () => faker.datatype.boolean()
});

export default factory;