# Sistema de Gestión Administrativa - Ayuntamiento de Villa de los Fresnos

Sistema web modular de gestión administrativa para el Ayuntamiento de Villa de los Fresnos. Aplicación Full-Stack con autenticación JWT que permite gestionar proveedores y está preparada para escalar a otras áreas administrativas (Padrón, Tributos, Licencias, etc.).

## Descripción

Plataforma web que digitaliza la gestión de proveedores del ayuntamiento, restringiendo el acceso a personal autorizado. El proyecto se divide en:

- **Área pública:** Página de acceso con formulario de login
- **Área privada:** Dashboard de navegación con acceso protegido a módulos de gestión

La aplicación está diseñada con una arquitectura modular que facilita la incorporación de nuevas áreas de gestión sin necesidad de refactorizar el código existente.

## Tecnologías

### Backend
- **Node.js** con **Express** - Servidor y API REST
- **JSON Web Tokens (JWT)** - Autenticación segura sin estado
- **Swagger** (OpenAPI 3.0) - Documentación interactiva de la API
- **dotenv** - Gestión segura de variables de entorno
- **CORS** - Comunicación segura entre orígenes
- **Nodemon** - Reinicio automático en desarrollo

### Frontend
- **Angular** (Standalone Components) - Framework frontend moderno
- **TypeScript** - Tipado estático
- **RxJS** - Programación reactiva
- **Reactive Forms** - Gestión de formularios con validación
- **Route Guards** - Protección de rutas privadas

### General
- **Git** - Control de versiones con commits semánticos
- **Postman** - Pruebas de endpoints
- **VS Code** - Entorno de desarrollo

## Características

### Seguridad
- Autenticación basada en JWT con tokens Bearer
- Middleware de autenticación en backend
- Route Guards en frontend
- Gestión segura de variables sensibles (`.env`)
- Validación de configuración al inicio del servidor

### Arquitectura
- **Backend:** Arquitectura en capas (controladores, servicios, modelos)
- **Frontend:** Standalone Components sin NgModules
- **Modularidad:** Diseño escalable preparado para múltiples módulos
- **API First:** Backend sólido y desacoplado del frontend

### Funcionalidad Actual
- Sistema completo de autenticación (login/logout)
- Dashboard central con navegación modular
- **Módulo de Gestión de Proveedores:**
  - Listar todos los proveedores
  - Crear nuevos proveedores
  - Editar proveedores existentes
  - Eliminar proveedores con confirmación
  - Validación de datos en formularios
  - Feedback visual de operaciones

### Documentación
- Documentación interactiva de la API con Swagger UI
- Especificación OpenAPI 3.0 en archivos YAML estructurados
- README completo con instrucciones de instalación

## Requisitos Previos

Antes de instalar el proyecto, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** (incluido con Node.js)
- **Angular CLI** (versión 19 o superior): `npm install -g @angular/cli`
- **Git** (para clonar el repositorio)

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/jferna78/ayuntamiento.git
cd ayuntamiento
```

### 2. Configurar el Backend

```bash
# Ir al directorio del backend
cd backend

# Instalar dependencias
npm install

# Crear archivo de entorno .env
# Copiar el siguiente contenido en backend/.env:
PORT=3000
SERVER_HOST=http://localhost
JWT_SECRET=tu_secreto_super_seguro_cambiar_en_produccion
```

**Importante:** Asegúrate de cambiar `JWT_SECRET` por un valor seguro y aleatorio, especialmente si despliegas la aplicación en producción.

### 3. Configurar el Frontend

```bash
# Volver al directorio raíz
cd ..

# Ir al directorio del frontend
cd frontend

# Instalar dependencias
npm install
```

## Ejecución

### 1. Iniciar el Backend

```bash
# Desde el directorio backend/
npm start
```

El servidor backend estará disponible en: `http://localhost:3000`

**Documentación de la API (Swagger):** `http://localhost:3000/api-docs`

### 2. Iniciar el Frontend

```bash
# Desde el directorio frontend/
ng serve
```

La aplicación frontend estará disponible en: `http://localhost:4200`

## Credenciales de Prueba

Para acceder al sistema, utiliza las siguientes credenciales:

- **Email:** `admin@local.es`
- **Contraseña:** `password123`

**Nota:** Estos son usuarios de prueba almacenados en memoria. En un entorno de producción deberían estar en una base de datos con contraseñas hasheadas.

## Uso de la Aplicación

### 1. Login
- Accede a `http://localhost:4200`
- Introduce las credenciales de prueba
- Serás redirigido al dashboard tras un login exitoso

### 2. Dashboard
- Vista principal del área privada
- Grid de módulos con acceso a diferentes áreas de gestión
- Actualmente solo el módulo de "Gestión de Proveedores" está activo
- Botón de logout en la esquina superior derecha

### 3. Gestión de Proveedores
- **Listar:** Visualiza todos los proveedores en formato tabla
- **Crear:** Haz clic en "Nuevo Proveedor" y rellena el formulario (CIF y nombre son obligatorios)
- **Editar:** Haz clic en el botón de edición de un proveedor existente
- **Eliminar:** Haz clic en el botón de eliminación y confirma la acción