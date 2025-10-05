const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

const login = (email, password) => {
  // 1. Buscar al usuario por su email
  const user = userModel.findUserByEmail(email);

  // 2. Verificar si el usuario existe y si la contraseña es correcta
  if (!user || user.password !== password) {
    throw new Error('Credenciales inválidas');
  }

  // 3. Crear el payload (datos que irán dentro del token)
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role
  };

  // 4. Firmar el token con el secreto y establecer una expiración
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h' // El token expirará en 1 hora
  });

  return token;
};

module.exports = {
  login
};