const { sequelize } = require('../../db');
const { QueryTypes } = require('sequelize');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config(); // Cargar variables de entorno desde el archivo .env

const SECRET_KEY = process.env.SECRET_KEY; // Obtener la clave secreta desde el archivo .env

// Verificar que la clave secreta está cargada correctamente
if (!SECRET_KEY) {
  throw new Error('SECRET_KEY no está definida. Asegúrate de que el archivo .env contiene SECRET_KEY.');
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, name, mode } = req.body;

    // Validar los parámetros básicos
    if (!email || !password || !mode) {
      return res.status(400).json({ success: false, message: 'Faltan parámetros requeridos.' });
    }

    // Verificar si es un registro o un login
    if (mode === 'register') {
      // Registro de Usuario
      if (!name) {
        return res.status(400).json({ success: false, message: 'El nombre es requerido para registrarse.' });
      }

      try {
        // Verificar si ya existe un usuario con ese email
        const [existingUser] = await sequelize.query(
          'SELECT email FROM usuarios WHERE email = ?',
          {
            replacements: [email],
            type: QueryTypes.SELECT,
          }
        );

        if (existingUser) {
          return res.status(400).json({ success: false, message: 'El email ya está registrado.' });
        }

        // Hashear la contraseña con bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar el nuevo usuario y obtener el ID generado
        const [result] = await sequelize.query(
          'INSERT INTO usuarios (email, contraseña, rol) VALUES (?, ?, ?)',
          {
            replacements: [email, hashedPassword, 'cliente'], // Registrando con el rol de 'cliente'
            type: QueryTypes.INSERT,
          }
        );

        const id_usuario = result; // ID del usuario recién creado

        // Generar token JWT
        const token = jwt.sign(
          { id_usuario: id_usuario, email: email },
          SECRET_KEY,
          { expiresIn: '1h' }
        );

        // Retornar el token y los datos del usuario
        return res.status(201).json({
          success: true,
          message: 'Usuario registrado exitosamente.',
          token: token,
          id_usuario: id_usuario,
          email: email,
        });
      } catch (error) {
        console.error('Error al registrar usuario:', error.message);
        return res.status(500).json({ success: false, message: 'Error en el servidor.' });
      }
    } else if (mode === 'login') {
      // Inicio de Sesión
      try {
        // Buscar al usuario por email
        const [usuario] = await sequelize.query(
          'SELECT id_usuario, email, contraseña FROM usuarios WHERE email = ?',
          {
            replacements: [email],
            type: QueryTypes.SELECT,
          }
        );

        if (!usuario) {
          return res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
        }

        // Comparar la contraseña proporcionada con la almacenada
        const passwordMatch = await bcrypt.compare(password, usuario.contraseña);

        if (!passwordMatch) {
          return res.status(400).json({ success: false, message: 'Contraseña incorrecta.' });
        }

        // Generar token JWT
        const token = jwt.sign(
          { id_usuario: usuario.id_usuario, email: usuario.email },
          SECRET_KEY,
          { expiresIn: '1h' }
        );

        // Retornar el token y los datos del usuario
        return res.status(200).json({
          success: true,
          message: 'Inicio de sesión exitoso',
          token: token,
          id_usuario: usuario.id_usuario,
          email: usuario.email,
        });
      } catch (error) {
        console.error('Error al realizar login:', error.message);
        return res.status(500).json({ success: false, message: 'Error en el servidor.' });
      }
    } else {
      return res.status(400).json({ success: false, message: 'Modo no válido.' });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Método no permitido.' });
  }
}
