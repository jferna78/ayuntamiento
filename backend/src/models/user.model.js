// Almacenamiento de usuarios en memoria (simulando una base de datos)

const users = [
  {
    id: 1,
    email: 'admin@local.es',
    password: 'password123', // En una app real, la contraseña estaría hasheada
    role: 'admin'
  }
];

// Función para encontrar un usuario por su email
const findUserByEmail = (email) => {
  return users.find(user => user.email === email);
};

module.exports = {
  findUserByEmail
};