// testDB.js

// Asegúrate de proporcionar la ruta correcta al archivo db.js
const { connectDB } = require('../db');  // ../db significa que está subiendo un nivel desde la carpeta 'test' a 'src'

// Llamar a la función para probar la conexión
connectDB();