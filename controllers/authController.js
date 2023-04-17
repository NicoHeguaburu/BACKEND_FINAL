const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarioModel');

const authController = {};

authController.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const usuario = new Usuario({ email, password: hashedPassword });
    await usuario.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

authController.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      throw new Error('El email o la contraseña son incorrectos');
    }

    const validPassword = await bcrypt.compare(password, usuario.password);

    if (!validPassword) {
      throw new Error('El email o la contraseña son incorrectos');
    }

    const token = jwt.sign({ userId: usuario._id }, process.env.JWT_SECRET_KEY);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = authController;
