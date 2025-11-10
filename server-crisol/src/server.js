import app from './app.js';

const port = process.env.PORT || 5173;

app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto: ${port}`)
});

process.on('SIGINT', () => {
    app.close();    
})