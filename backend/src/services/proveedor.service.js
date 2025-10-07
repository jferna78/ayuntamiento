const proveedorModel = require('../models/proveedor.model');

const getAllProveedores = () => {
  return proveedorModel.findAll();
};

const getProveedorByCif = (cif) => {
  const proveedor = proveedorModel.findByCif(cif);
  if (!proveedor) {
    throw new Error('Proveedor no encontrado');
  }
  return proveedor;
};

const createProveedor = (proveedorData) => {
  if (proveedorModel.findByCif(proveedorData.cif)) {
    throw new Error('Ya existe un proveedor con ese CIF');
  }
  return proveedorModel.save(proveedorData);
};

const updateProveedor = (cif, proveedorData) => {
  const updatedProveedor = proveedorModel.update(cif, proveedorData);
  if (!updatedProveedor) {
    throw new Error('Proveedor no encontrado');
  }
  return updatedProveedor;
};

const deleteProveedor = (cif) => {
  if (!proveedorModel.remove(cif)) {
    throw new Error('Proveedor no encontrado');
  }
};

module.exports = {
  getAllProveedores, getProveedorByCif, createProveedor, updateProveedor, deleteProveedor
};