const proveedorService = require('../services/proveedor.service');

const getAll = (req, res) => {
  const proveedores = proveedorService.getAllProveedores();
  res.status(200).json(proveedores);
};

const getByCif = (req, res) => {
  try {
    const proveedor = proveedorService.getProveedorByCif(req.params.cif);
    res.status(200).json(proveedor);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const create = (req, res) => {
  try {
    // Validación básica como se describe en la memoria del proyecto
    const { cif, nombre } = req.body;
    if (!cif || !nombre) {
      return res.status(400).json({ message: 'CIF y Nombre son campos obligatorios' });
    }

    const nuevoProveedor = proveedorService.createProveedor(req.body);
    res.status(201).json(nuevoProveedor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const update = (req, res) => {
  try {
    // No se debe permitir cambiar el CIF en una actualización
    if (req.body.cif && req.body.cif !== req.params.cif) {
      return res.status(400).json({ message: 'No se puede modificar el CIF.' });
    }

    const proveedorActualizado = proveedorService.updateProveedor(req.params.cif, req.body);
    res.status(200).json(proveedorActualizado);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const remove = (req, res) => {
  try {
    proveedorService.deleteProveedor(req.params.cif);
    // 204 No Content es la respuesta estándar para un borrado exitoso
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


module.exports = {
  getAll,
  getByCif,
  create,
  update,
  remove
};