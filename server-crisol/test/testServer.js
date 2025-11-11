import { MongoMemoryServer } from 'mongodb-memory-server'; // Volvemos a usar import
import mongoose from 'mongoose'; // Volvemos a usar import

let mongod;

// Configuración que se ejecuta antes de todos los tests
beforeAll (async() => {
    // 1. Crear la instancia de la base de datos en memoria
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    // 2. Conectar Mongoose a la base de datos en memoria
    await mongoose.connect(uri);
})

// Configuración que se ejecuta después de todos los tests
afterAll(async() => {
    // 1. Eliminar la base de datos de prueba
    await mongoose.connection.dropDatabase();
    // 2. Cerrar la conexión de Mongoose
    await mongoose.connection.close();
    // 3. Detener la instancia de MongoDB en memoria
    await mongod.stop();
})

// Configuración que se ejecuta después de cada test individual
afterEach(async() => {
    // Limpiar todas las colecciones para que cada test sea independiente
    const collections = mongoose.connection.collections;

    for(const key in collections){
        const collection = collections[key];
        // Borrar todos los documentos de la colección
        await collection.deleteMany();
    }
})