const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedor.controller');

// GET /proveedores - Obtiene la lista de todos los proveedores.
router.get('/', proveedorController.getAll);

// POST /proveedores - Crea un nuevo proveedor.
router.post('/', proveedorController.create);

// GET /proveedores/{cif} - Obtiene los detalles de un proveedor.
router.get('/:cif', proveedorController.getByCif);

// PUT /proveedores/{cif} - Actualiza un proveedor existente.
router.put('/:cif', proveedorController.update);

// DELETE /proveedores/{cif} - Elimina un proveedor.
router.delete('/:cif', proveedorController.remove);

module.exports = router;