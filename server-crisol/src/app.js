import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import path from 'path';
import swaggerUI from "swagger-ui-express";
import { fileURLToPath } from 'url';
import swaggerSpec from "../docs/swagger.json" with { type: 'json' };
import Authenticate from './middlewares/authentication-middleware.js';
import { apiLimiter, authLimiter } from './middlewares/rate-limit-middleware.js';
import blogRouter from './routes/Blog-route.js';
import commentRouter from './routes/Comment-route.js';
import newsRouter from './routes/News-route.js';
import userRouter from './routes/User-route.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

const api = process.env.API_URL;

const whitelist = [
  'https://blog-app-web-crisol.vercel.app',
  'http://localhost:8081',
  'http://127.0.0.1:8081' // A veces el navegador usa la IP en lugar de localhost
];

const corsOptions = {
  origin: function (origin, callback) {
    // Permitir si el origen está en la lista o si no hay origen (Postman/Curl)
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Bloqueado por políticas de CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD'],
  credentials: true,
  optionsSuccessStatus: 204
};

// IMPORTANTE: Solo una vez y ANTES de tus rutas
app.use(cors(corsOptions));

//Middleware
app.use(express.json());
app.use(Authenticate);
if (process.env.NODE_ENV !== 'test' || process.env.ENABLE_RATE_LIMIT_TEST === 'true') {
    app.use(`${api}`, apiLimiter);
    app.use(`${api}/user/login`, authLimiter);
}
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.get(`/`, (req, res) => {
    res.sendFile(path.join(__dirname, 'assets', 'index.html'));
});
app.use(`${api}/user`, userRouter);
app.use(`${api}/blog`, blogRouter);
app.use(`${api}/comment`, commentRouter);
app.use(`${api}/news`, newsRouter);


export default app;