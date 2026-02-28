import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "../docs/swagger.json" with { type: 'json' };
import userRouter from './routes/User-route.js';
import blogRouter from './routes/Blog-route.js';
import commentRouter from './routes/Comment-route.js';
import newsRouter from './routes/News-route.js';
import Authenticate from './middlewares/authentication-middleware.js';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

const api = process.env.API_URL;

const corsOptions = {
    origin: 'https://blog-app-web-crisol.vercel.app', // Reemplaza con el origen de tu frontend
    //origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Si necesitas manejar cookies o cabeceras de autorización
    optionsSuccessStatus: 204 // Código de estado para respuestas OPTIONS exitosas
};

app.use(cors());
app.use(cors(corsOptions));

//Middleware
app.use(express.json());
app.use(Authenticate);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.get(`/`, (req, res) => {
    res.sendFile(path.join(__dirname, 'assets', 'index.html'));
});
app.use(`${api}/user`, userRouter);
app.use(`${api}/blog`, blogRouter);
app.use(`${api}/comment`, commentRouter);
app.use(`${api}/news`, newsRouter);


export default app;