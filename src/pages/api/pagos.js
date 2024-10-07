// src/pages/api/pagos.js

import { sequelize } from '../../db';
import { QueryTypes } from 'sequelize';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Deshabilitar el bodyParser de Next.js para manejar archivos
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();

    // Establecer la carpeta para guardar los archivos
    form.uploadDir = path.join(process.cwd(), '/public/uploads');
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error al procesar el formulario:', err);
        return res.status(500).json({ success: false, message: 'Error al procesar el formulario' });
      }

      const {
        nombre,
        apellidos,
        telefono,
        email,
        direccion,
        provincia,
        distrito,
        codigoPostal,
        metodoPago,
        tarjeta,
        expiracion,
        cvv,
      } = fields;

      // Validar los campos según sea necesario

      // Procesar el pago según el método
      if (metodoPago === 'tarjeta') {
        // Aquí implementa la lógica para procesar el pago con tarjeta de forma segura
        // Utiliza un proveedor como Stripe o PayPal
      } else if (metodoPago === 'yape' || metodoPago === 'plin') {
        // Manejar el comprobante de pago
        const comprobante = files.comprobantePago;
        if (comprobante) {
          // Validar el archivo (tipo, tamaño, etc.)
          const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
          if (!validTypes.includes(comprobante.mimetype)) {
            return res.status(400).json({ success: false, message: 'El archivo debe ser una imagen' });
          }

          // Mover el archivo a la carpeta de uploads
          const newFilePath = path.join(form.uploadDir, comprobante.newFilename);
          fs.renameSync(comprobante.filepath, newFilePath);

          // Guardar la información en la base de datos
          // Puedes guardar la ruta del archivo y los datos del pedido
          try {
            // Inserta el pedido en la base de datos
            await sequelize.query(
              'INSERT INTO pedidos (nombre, apellidos, telefono, email, direccion, provincia, distrito, codigoPostal, metodoPago, comprobantePago, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
              {
                replacements: [
                  nombre,
                  apellidos,
                  telefono,
                  email,
                  direccion,
                  provincia,
                  distrito,
                  codigoPostal,
                  metodoPago,
                  `/uploads/${comprobante.newFilename}`,
                  'pendiente', // Estado inicial del pedido
                ],
                type: QueryTypes.INSERT,
              }
            );

            return res.status(200).json({ success: true, message: 'Pedido registrado exitosamente' });
          } catch (error) {
            console.error('Error al guardar el pedido:', error);
            return res.status(500).json({ success: false, message: 'Error al guardar el pedido' });
          }
        } else {
          return res.status(400).json({ success: false, message: 'El comprobante de pago es requerido' });
        }
      } else {
        return res.status(400).json({ success: false, message: 'Método de pago no soportado' });
      }
    });
  } else {
    res.status(405).json({ success: false, message: 'Método no permitido' });
  }
}
