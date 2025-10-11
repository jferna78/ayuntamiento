// Configuración de entorno
require('dotenv').config();

if (!process.env.JWT_SECRET) {
  console.error('ERROR: JWT_SECRET no está configurado en .env');
  process.exit(1);
}

// Dependencias
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const authRoutes = require('./routes/auth.routes');
const proveedorRoutes = require('./routes/proveedor.routes');

// Inicializar Express
const app = express();

// Configuración de Swagger
const loadSwaggerDocs = () => {
  try {
    const swaggerPath = path.join(__dirname, '../docs/swagger/swagger.yaml');
    const authPath = path.join(__dirname, '../docs/swagger/auth.yaml');
    const proveedoresPath = path.join(__dirname, '../docs/swagger/proveedores.yaml');

    const swaggerDoc = yaml.load(fs.readFileSync(swaggerPath, 'utf8'));
    const authDoc = yaml.load(fs.readFileSync(authPath, 'utf8'));
    const proveedoresDoc = yaml.load(fs.readFileSync(proveedoresPath, 'utf8'));

    swaggerDoc.paths = {
      ...authDoc.paths,
      ...proveedoresDoc.paths
    };

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

// Middlewares
app.use(express.json());
app.use(cors());

// Rutas
app.use('/auth', authRoutes);
app.use('/proveedores', proveedorRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});