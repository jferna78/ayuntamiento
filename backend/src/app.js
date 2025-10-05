// Cargar variables de entorno
require('dotenv').config();

// Importar dependencias
const express = require('express');
const cors = require('cors');

// Importar las rutas de autenticación
const authRoutes = require('./routes/auth.routes');

// Inicializar la aplicación de Express
const app = express();

// Configurar Middlewares
app.use(express.json());
app.use(cors());

// Definir una ruta de prueba
app.get('/', (req, res) => {
  res.send('API del Sistema de Gestión de Proveedores está funcionando.');
});

// Usar las rutas de autenticación
// Todas las rutas definidas en auth.routes.js tendrán el prefijo /auth
app.use('/auth', authRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});