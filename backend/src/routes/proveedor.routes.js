const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedor.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

// TODAS las rutas de proveedores están protegidas y requieren autenticación
// El middleware verifyToken se aplica a todas las rutas de este router

// GET /proveedores - Obtiene la lista de todos los proveedores.
router.get('/', verifyToken, proveedorController.getAll);

// POST /proveedores - Crea un nuevo proveedor.
router.post('/', verifyToken, proveedorController.create);

// GET /proveedores/{cif} - Obtiene los detalles de un proveedor.
router.get('/:cif', verifyToken, proveedorController.getByCif);

// PUT /proveedores/{cif} - Actualiza un proveedor existente.
router.put('/:cif', verifyToken, proveedorController.update);

// DELETE /proveedores/{cif} - Elimina un proveedor.
router.delete('/:cif', verifyToken, proveedorController.remove);

module.exports = router;