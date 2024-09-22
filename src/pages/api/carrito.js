const { sequelize } = require('../../db');
const { QueryTypes } = require('sequelize');

export default async function handler(req, res) {
  const id_usuario = 1;  // Id de usuario fijo temporalmente

  if (req.method === 'POST') {
    const { id_producto, cantidad } = req.body;

    // Validar los parámetros y la cantidad mayor a 0
    if (!id_producto || !cantidad || cantidad <= 0) {
      return res.status(400).json({ success: false, message: 'Faltan parámetros requeridos o la cantidad es inválida.' });
    }

    try {
      // Verificar si el usuario ya tiene un carrito "pendiente"
      let [carrito] = await sequelize.query(
        'SELECT id_carrito FROM carrito_compras WHERE id_usuario = ? AND estado = "pendiente"',
        {
          replacements: [id_usuario],
          type: QueryTypes.SELECT,
        }
      );

      // Si no hay un carrito, crear uno nuevo
      if (!carrito) {
        const result = await sequelize.query(
          'INSERT INTO carrito_compras (id_usuario, estado) VALUES (?, "pendiente")',
          {
            replacements: [id_usuario],
            type: QueryTypes.INSERT,
          }
        );
        carrito = { id_carrito: result[0] }; // Obtener el ID del carrito recién creado
      }

      // Verificar si el producto ya está en el carrito
      const [productoEnCarrito] = await sequelize.query(
        'SELECT cantidad FROM detalles_carrito WHERE id_carrito = ? AND id_producto = ?',
        {
          replacements: [carrito.id_carrito, id_producto],
          type: QueryTypes.SELECT,
        }
      );

      // Si el producto ya está en el carrito, actualizar la cantidad
      if (productoEnCarrito) {
        await sequelize.query(
          'UPDATE detalles_carrito SET cantidad = cantidad + ? WHERE id_carrito = ? AND id_producto = ?',
          {
            replacements: [cantidad, carrito.id_carrito, id_producto],
            type: QueryTypes.UPDATE,
          }
        );
      } else {
        // Insertar el nuevo producto en el carrito
        await sequelize.query(
          'INSERT INTO detalles_carrito (id_carrito, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, (SELECT precio FROM productos WHERE id_producto = ?))',
          {
            replacements: [carrito.id_carrito, id_producto, cantidad, id_producto],
            type: QueryTypes.INSERT,
          }
        );
      }

      res.status(200).json({ success: true, message: 'Producto agregado o actualizado en el carrito' });
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error.message);
      res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
  } else if (req.method === 'GET') {
    const { id_usuario } = req.query;

    if (!id_usuario) {
      return res.status(400).json({ success: false, message: 'El ID de usuario es requerido.' });
    }

    try {
      // Obtener los productos en el carrito pendiente del usuario
      const productosCarrito = await sequelize.query(
        `
 SELECT p.id_producto, p.nombre_producto, p.descripcion, p.imagen, p.precio_unidad, dc.cantidad, dc.precio_unitario 
      FROM detalles_carrito dc 
      JOIN productos p ON dc.id_producto = p.id_producto
      JOIN carrito_compras cc ON dc.id_carrito = cc.id_carrito
      WHERE cc.id_usuario = ? AND cc.estado = "pendiente"
    
        `,
        {
          replacements: [id_usuario],
          type: QueryTypes.SELECT,
        }
      );

      res.status(200).json(productosCarrito);
    } catch (error) {
      console.error('Error al obtener productos del carrito:', error.message);
      res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
  } else if (req.method === 'DELETE') {
    const { id_producto, id_usuario } = req.body;

    if (!id_producto || !id_usuario) {
      return res.status(400).json({ success: false, message: 'Faltan parámetros requeridos.' });
    }

    try {
      // Eliminar el producto del carrito del usuario
      await sequelize.query(
        'DELETE FROM detalles_carrito WHERE id_producto = ? AND id_carrito = (SELECT id_carrito FROM carrito_compras WHERE id_usuario = ? AND estado = "pendiente")',
        {
          replacements: [id_producto, id_usuario],
          type: QueryTypes.DELETE,
        }
      );

      res.status(200).json({ success: true, message: 'Producto eliminado del carrito' });
    } catch (error) {
      console.error('Error al eliminar producto del carrito:', error.message);
      res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
  }
}
