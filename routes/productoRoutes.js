const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");
const authMiddleware = require("../middlewares/authMiddleware");

// Rutas para productos
router.get("/", productoController.getProductos);
router.post("/", authMiddleware, productoController.createProducto);
router.put("/:id", authMiddleware, productoController.updateProducto);
router.delete("/:id", authMiddleware, productoController.deleteProducto);

module.exports = router;
