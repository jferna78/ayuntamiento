// Almacenamiento de proveedores en memoria (simulando una base de datos)
const proveedores = [
  {
    "cif": "B85123456",
    "nombre": "TecnoSoluciones Fresnedillas",
    "actividad": "Informática",
    "direccion": "Av. de la Constitución, 24",
    "localidad": "Fresnedillas de la Oliva",
    "codigoPostal": "28214",
    "telefono": "918987654"
  },
  {
    "cif": "B86234567",
    "nombre": "Construcciones Robledo SL",
    "actividad": "Construcción",
    "direccion": "Plaza de España, 10",
    "localidad": "Robledo de Chavela",
    "codigoPostal": "28294",
    "telefono": "918995432"
  },
  {
    "cif": "B87345678",
    "nombre": "Mobiliario y Diseño Escurialense",
    "actividad": "Mobiliario",
    "direccion": "Calle del Rey, 45",
    "localidad": "El Escorial",
    "codigoPostal": "28280",
    "telefono": "918901234"
  },
  {
    "cif": "A88456789",
    "nombre": "Sistemas Informáticos Zarzalejo",
    "actividad": "Informática",
    "direccion": "Paseo de la Estación, 8",
    "localidad": "Zarzalejo",
    "codigoPostal": "28293",
    "telefono": "918993344"
  },
  {
    "cif": "B89567890",
    "nombre": "Reformas y Obras Navas del Rey",
    "actividad": "Construcción",
    "direccion": "Calle de la Iglesia, 12",
    "localidad": "Navas del Rey",
    "codigoPostal": "28695",
    "telefono": "918650011"
  },
  {
    "cif": "C90678901",
    "nombre": "Ofimueble Sierra Oeste",
    "actividad": "Mobiliario",
    "direccion": "Polígono Industrial La Poveda, Nave 7",
    "localidad": "Villa de los Fresnos",
    "codigoPostal": "28696",
    "telefono": "918612233"
  }
];

const findAll = () => proveedores;

const findByCif = (cif) => proveedores.find(p => p.cif === cif);

const save = (proveedor) => {
  // Simula la creación de un nuevo proveedor
  proveedores.push(proveedor);
  return proveedor;
};

const update = (cif, proveedorData) => {
  const index = proveedores.findIndex(p => p.cif === cif);
  if (index === -1) {
    return null;
  }
  // Actualiza el proveedor manteniendo el CIF original
  proveedores[index] = { ...proveedores[index], ...proveedorData };
  return proveedores[index];
};

const remove = (cif) => {
  const index = proveedores.findIndex(p => p.cif === cif);
  if (index === -1) {
    return false;
  }
  proveedores.splice(index, 1);
  return true;
};

module.exports = {
  findAll,
  findByCif,
  save,
  update,
  remove
};