// Cargar variables de entorno
require('dotenv').config();

// Importar dependencias
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

// Importar las rutas de autenticación
const authRoutes = require('./routes/auth.routes');
const proveedorRoutes = require('./routes/proveedor.routes');

// Inicializar la aplicación de Express
const app = express();

// Configuración de Swagger desde archivos YAML
const loadSwaggerDocs = () => {
  try {
    // Cargar el archivo principal de Swagger
    const swaggerPath = path.join(__dirname, '../docs/swagger/swagger.yaml');
    const swaggerDoc = yaml.load(fs.readFileSync(swaggerPath, 'utf8'));

    // Cargar los archivos de documentación de endpoints
    const authPath = path.join(__dirname, '../docs/swagger/auth.yaml');
    const proveedoresPath = path.join(__dirname, '../docs/swagger/proveedores.yaml');

    const authDoc = yaml.load(fs.readFileSync(authPath, 'utf8'));
    const proveedoresDoc = yaml.load(fs.readFileSync(proveedoresPath, 'utf8'));

    // Combinar todos los paths en el documento principal
    swaggerDoc.paths = {
      ...authDoc.paths,
      ...proveedoresDoc.paths
    };

    // Actualizar la URL del servidor con las variables de entorno
    const serverHost = process.env.SERVER_HOST || 'http://localhost';
    const serverPort = process.env.PORT || 3000;
    swaggerDoc.servers[0].url = `${serverHost}:${serverPort}`;

    return swaggerDoc;
  } catch (error) {
    console.error('Error al cargar la documentación de Swagger:', error);
    return null;
  }
};

const swaggerSpec = loadSwaggerDocs();

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
app.use('/proveedores', proveedorRoutes);

// Ruta de documentación de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});