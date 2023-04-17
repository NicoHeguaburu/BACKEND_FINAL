const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const productoRoutes = require('./routes/productoRoutes');
const carritoRoutes = require('./routes/carritoRoutes');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const uri = 'mongodb://localhost:27017/';


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch(err => console.error(err));

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/productos', productoRoutes);
app.use('/carrito', carritoRoutes);

const User = require('./models/usuarioModel');

// Crea un nuevo usuario
const userA = new User({
  name: 'Juan',
  email: 'juan@example.com',
  password: 'contraseña',
});

// Guarda el usuario en la base de datos
userA.save()
  .then((result) => {
    console.log('Usuario creado exitosamente:', result);
  })
  .catch((error) => {
    console.log('Error al crear usuario:', error);
  });

  