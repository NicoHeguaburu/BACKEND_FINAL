const mongoose = require("mongoose");

const carritoSchema = new mongoose.Schema({
  usuarioId: { type: String, required: true },
  productos: [
    {
      productoId: { type: mongoose.Schema.Types.ObjectId, ref: "Producto" },
      cantidad: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  fecha: { type: Date, default: Date.now },
});

const Carrito = mongoose.model("Carrito", carritoSchema);

module.exports = Carrito;
