import mongoose from 'mongoose';

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING, {
            dbName: 'db-blog'
        });
        console.log('✅ Conexión a la base de datos funcionando!');
    } catch (error) {
       console.error('❌ Error de conexión a MongoDB:', err.message);
        // Salir del proceso con error
        process.exit(1); 
    }
}

export default connectDB;