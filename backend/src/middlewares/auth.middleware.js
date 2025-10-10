const jwt = require('jsonwebtoken');

/**
 * Middleware de Autenticación
 *
 * Verifica que el cliente incluya un token JWT válido en la cabecera Authorization.
 * Si el token es válido, permite el acceso al siguiente middleware o controlador.
 * Si no es válido o no existe, devuelve un error 401 Unauthorized.
 *
 * @param {Object} req - Objeto de petición HTTP
 * @param {Object} res - Objeto de respuesta HTTP
 * @param {Function} next - Función para pasar al siguiente middleware
 */
const verifyToken = (req, res, next) => {
  // 1. Obtener la cabecera Authorization
  const authHeader = req.headers['authorization'];

  // 2. Verificar que existe la cabecera
  if (!authHeader) {
    return res.status(401).json({
      message: 'Acceso denegado. No se proporcionó token de autenticación.'
    });
  }

  // 3. Extraer el token del formato "Bearer <token>"
  const token = authHeader.split(' ')[1]; // Separa "Bearer" del token

  if (!token) {
    return res.status(401).json({
      message: 'Acceso denegado. Formato de token inválido.'
    });
  }

  // 4. Verificar la validez del token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Adjuntar los datos del usuario decodificados al objeto request
    // Esto permite que los controladores accedan a la información del usuario autenticado
    req.user = decoded;

    // 6. Pasar al siguiente middleware o controlador
    next();
  } catch (error) {
    // El token es inválido, ha expirado o ha sido manipulado
    return res.status(401).json({
      message: 'Token inválido o expirado.'
    });
  }
};

module.exports = { verifyToken };
