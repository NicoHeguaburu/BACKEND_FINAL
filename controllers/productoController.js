const Producto = require('../models/productoModel');

exports.getProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json({ productos });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, imagen, stock } = req.body;

    const producto = new Producto({
      nombre,
      descripcion,
      precio,
      imagen,
      stock
    });

    await producto.save();

    res.status(201).json({ message: 'Producto creado exitosamente', producto });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, descripcion } = req.body;
    const producto = await Producto.findByIdAndUpdate(id, { nombre, precio, descripcion }, { new: true });
    res.status(200).json({ message: 'Producto actualizado exitosamente', producto });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;
    await Producto.findByIdAndDelete(id);
    res.status(200).json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
