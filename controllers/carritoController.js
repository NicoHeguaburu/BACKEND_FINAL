const Carrito = require('../models/carritoModel.js');

const carritoController = {};

carritoController.agregarProducto = async (req, res) => {
  try {
    const { idProducto, cantidad } = req.body;
    const { usuario } = req;
    const carrito = await Carrito.findOne({ usuario: usuario._id });
    if (carrito) {
      const productoEnCarrito = carrito.productos.find(
        (producto) => producto.idProducto === idProducto
      );
      if (productoEnCarrito) {
        productoEnCarrito.cantidad += cantidad;
      } else {
        carrito.productos.push({ idProducto, cantidad });
      }
      await carrito.save();
      res.json({ mensaje: 'Producto agregado al carrito' });
    } else {
      const nuevoCarrito = new Carrito({
        usuario: usuario._id,
        productos: [{ idProducto, cantidad }],
      });
      await nuevoCarrito.save();
      res.json({ mensaje: 'Producto agregado al carrito' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Error al agregar producto al carrito' });
  }
};

carritoController.eliminarProducto = async (req, res) => {
  try {
    const { idProducto } = req.params;
    const { usuario } = req;
    const carrito = await Carrito.findOne({ usuario: usuario._id });
    if (carrito) {
      carrito.productos = carrito.productos.filter(
        (producto) => producto.idProducto !== idProducto
      );
      await carrito.save();
      res.json({ mensaje: 'Producto eliminado del carrito' });
    } else {
      res.status(404).json({ mensaje: 'Carrito no encontrado' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensaje: 'Error al eliminar producto del carrito' });
  }
};

module.exports = carritoController;