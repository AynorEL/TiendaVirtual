import Producto from '../../models/Producto'; // Importa el modelo de Producto
import { Op } from 'sequelize'; // Operador para realizar búsquedas con LIKE

export default async function handler(req, res) {
  const { search } = req.query; // Captura el parámetro de búsqueda

  try {
    let productos;

    // Si hay un término de búsqueda, filtrar productos
    if (search) {
      productos = await Producto.findAll({
        where: {
          nombre_producto: {
            [Op.like]: `%${search}%` // Busca los productos que contienen el término de búsqueda
          }
        }
      });
    } else {
      // Si no hay búsqueda, obtener todos los productos
      productos = await Producto.findAll();
    }

    res.status(200).json(productos); // Responder con los productos encontrados en formato JSON
  } catch (error) {
    console.error('Error al obtener productos:', error); // Log para capturar errores
    res.status(500).json({ message: 'Error al obtener productos', error });
  }
}
