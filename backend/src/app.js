// 1. Cargar variables de entorno
require('dotenv').config();

// 2. Importar dependencias
const express = require('express');
const cors = require('cors');

// 3. Inicializar la aplicación de Express
const app = express();

// 4. Configurar Middlewares
// Permite peticiones desde cualquier origen (configurable para producción)
app.use(cors());
// Permite al servidor entender y procesar datos en formato JSON
app.use(express.json());

// 5. Definir una ruta de prueba
app.get('/', (req, res) => {
  res.send('API del Sistema de Gestión de Proveedores está funcionando.');
});

// 6. Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});