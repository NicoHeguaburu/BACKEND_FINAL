const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');

// Rutas para carrito
router.post('/agregar-producto', carritoController.agregarProducto);
router.delete('/eliminar-producto/:idProducto', carritoController.eliminarProducto);

module.exports = router;
