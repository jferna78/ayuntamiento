const authService = require('../services/auth.service');

const loginController = (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar que se recibieron los datos necesarios
    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }

    // Llamar al servicio para generar el token
    const token = authService.login(email, password);

    // Enviar el token en la respuesta
    res.status(200).json({
      message: 'Login exitoso',
      token: token
    });

  } catch (error) {
    // Manejar el error de credenciales inválidas
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  loginController
};