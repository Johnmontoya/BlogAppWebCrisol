import app from './app.js';
import connectDB from "../config/dbMongoConnection.js"; 
import 'dotenv/config';

const port = process.env.PORT || 5173;

const startServer = async () => {
    try {
        await connectDB();
        
        app.listen(port, () => {
            console.log(`🚀 El servidor esta funcionando en el puerto: ${port}`);
        });

    } catch (error) {
        console.error("No se pudo iniciar el servidor debido a un error de DB.");
    }
};

startServer();

// Manejo del cierre (SIGINT)
process.on('SIGINT', () => {
    console.log('\nServidor cerrándose...');
    process.exit(0);
});