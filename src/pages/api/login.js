const { sequelize } = require('../../db');
const { QueryTypes } = require('sequelize');
const crypto = require('crypto');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, name, mode } = req.body;

    // Validar los parámetros básicos
    if (!email || !password || !mode) {
      return res.status(400).json({ success: false, message: 'Faltan parámetros requeridos.' });
    }

    // Verificar si es un registro o un login
    if (mode === 'register') {
      // **Registro de Usuario**
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

        // Crear el hash MD5 de la contraseña
        const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

        // Insertar el nuevo usuario
        await sequelize.query(
          'INSERT INTO usuarios (nombre, email, contraseña, rol) VALUES (?, ?, ?, ?)',
          {
            replacements: [name, email, hashedPassword, 'cliente'], // Rol por defecto 'cliente'
            type: QueryTypes.INSERT,
          }
        );

        return res.status(201).json({ success: true, message: 'Usuario registrado exitosamente.' });
      } catch (error) {
        console.error('Error al registrar usuario:', error.message);
        return res.status(500).json({ success: false, message: 'Error en el servidor.' });
      }
    } else if (mode === 'login') {
      // **Inicio de Sesión**
      try {
        // Buscar al usuario por email
        const [usuario] = await sequelize.query(
          'SELECT id_usuario, nombre, email, contraseña FROM usuarios WHERE email = ?',
          {
            replacements: [email],
            type: QueryTypes.SELECT,
          }
        );

        if (!usuario) {
          return res.status(404).json({ success: false, message: 'Usuario no encontrado.' });
        }

        // Crear el hash MD5 de la contraseña proporcionada
        const hashedPassword = crypto.createHash('md5').update(password).digest('hex');

        // Comparar la contraseña proporcionada con la almacenada
        if (hashedPassword !== usuario.contraseña) {
          return res.status(400).json({ success: false, message: 'Contraseña incorrecta.' });
        }

        return res.status(200).json({
          success: true,
          message: 'Inicio de sesión exitoso',
          user: {
            id_usuario: usuario.id_usuario,
            nombre: usuario.nombre,
            email: usuario.email,
          },
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
