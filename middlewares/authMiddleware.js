const jwt = require('jsonwebtoken');
const userA = require('../app');

// Middleware para verificar la autenticación del usuario
module.exports = function(req, res, next) {
  // Obtener el token de autorización del encabezado
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    // Si no hay encabezado de autorización, enviar error 401
    return res.status(401).json({ message: 'No se proporcionó un token de autenticación' });
  }

  // El encabezado de autorización debe estar en el formato 'Bearer <token>'
  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    // Si el encabezado de autorización no está en el formato correcto, enviar error 401
    return res.status(401).json({ message: 'El encabezado de autorización no está en el formato correcto' });
  }

  const token = parts[1];

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, user.contraseña);

    // Añadir el usuario decodificado a la solicitud
    req.user = decoded.user;

    // Continuar con la siguiente función de middleware
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      // Si el token no es válido, enviar error 401
      return res.status(401).json({ message: 'El token de autenticación no es válido' });
    } else if (err.name === 'TokenExpiredError') {
      // Si el token ha expirado, enviar error 401
      return res.status(401).json({ message: 'El token de autenticación ha expirado' });
    }

    // En caso de cualquier otro error, enviar error 500
    return res.status(500).json({ message: 'Ha ocurrido un error al verificar el token de autenticación' });
  }
};
