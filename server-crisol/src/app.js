import express from 'express';
import path from 'path';
import cors from 'cors';

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173', // Reemplaza con el origen de tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Si necesitas manejar cookies o cabeceras de autorización
    optionsSuccessStatus: 204 // Código de estado para respuestas OPTIONS exitosas
};

app.use(cors());
app.use(cors(corsOptions));

//Middleware
app.use(express.json());


export default app;