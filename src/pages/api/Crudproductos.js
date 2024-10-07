// C:\Users\Lina\Videos\tiendavirtual\src\pages\api\Crudproductos.js

const { sequelize } = require('../../db');
const { QueryTypes } = require('sequelize');
const multer = require('multer');
const path = require('path');

// Deshabilitar el analizador de cuerpo (body parser) predeterminado de Next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

// Configuración de Multer para almacenar imágenes con límite de 40 MB
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(process.cwd(), 'public/images');
    console.log(`Destino de la imagen configurado en: ${dir}`);
    cb(null, dir); // Guardamos la imagen en 'public/images'
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileName = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
    console.log(`Nombre de archivo configurado como: ${fileName}`);
    cb(null, fileName);
  },
});

// Filtro para aceptar solo imágenes
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/avif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Acepta el archivo
  } else {
    console.error(`Tipo de archivo no permitido: ${file.mimetype}`);
    cb(new Error('Tipo de archivo no permitido. Solo se aceptan imágenes.'));
  }
};

// Aumentamos el límite de tamaño de archivos a 40 MB
const upload = multer({
  storage: storage,
  limits: { fileSize: 40 * 1024 * 1024 }, // Límite de 40 MB
  fileFilter: fileFilter, // Filtro para aceptar solo imágenes
}).single('imagen');

// Manejo de la solicitud principal
export default async function handler(req, res) {
  const method = req.method;

  try {
    console.log(`Método de la solicitud: ${method}`);

    switch (method) {
      case 'GET':
        const { tipo } = req.query;
        if (tipo === 'proveedores') {
          return getAllProveedores(req, res);
        } else if (tipo === 'categorias') {
          return getAllCategorias(req, res);
        } else {
          return getAllProducts(req, res);
        }

      case 'POST':
        console.log('Solicitud POST recibida. Iniciando proceso de subida de imagen...');
        upload(req, res, function (err) {
          if (err instanceof multer.MulterError) {
            console.error(`Error específico de Multer al subir la imagen: ${err.message}`);
            return res.status(500).json({ error: `Error de Multer: ${err.message}` });
          } else if (err) {
            console.error(`Error general al subir la imagen: ${err.message}`);
            return res.status(500).json({ error: `Error al subir imagen: ${err.message}` });
          }

          console.log('Datos recibidos del cuerpo de la solicitud:', req.body);

          return createProduct(req, res);
        });
        break;

      case 'PUT':
        console.log('Solicitud PUT recibida. Iniciando proceso de actualización de imagen...');
        upload(req, res, function (err) {
          if (err instanceof multer.MulterError) {
            console.error(`Error específico de Multer al actualizar la imagen: ${err.message}`);
            return res.status(500).json({ error: `Error de Multer: ${err.message}` });
          } else if (err) {
            console.error(`Error general al actualizar la imagen: ${err.message}`);
            return res.status(500).json({ error: `Error al actualizar la imagen: ${err.message}` });
          }

          console.log('Datos recibidos del cuerpo de la solicitud:', req.body);

          return updateProduct(req, res);
        });
        break;

      case 'DELETE':
        console.log('Solicitud DELETE recibida. Iniciando proceso de eliminación...');
        return deleteProduct(req, res);

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        console.warn(`Método no permitido: ${method}`);
        return res.status(405).end(`Método ${method} no permitido`);
    }
  } catch (error) {
    console.error(`Error en el procesamiento de la solicitud: ${error.message}`);
    return res.status(500).json({ error: `Error en el servidor: ${error.message}` });
  }
}

// Obtener todos los productos (GET)
const getAllProducts = async (req, res) => {
  try {
    console.log('Consultando todos los productos en la base de datos...');
    const productos = await sequelize.query(
      `SELECT p.*, pr.nombre AS nombre_proveedor, c.nombre_categoria
       FROM productos p
       LEFT JOIN proveedores pr ON p.id_proveedor = pr.id_proveedor
       LEFT JOIN categorias c ON p.id_categoria = c.id_categoria`,
      {
        type: QueryTypes.SELECT,
      }
    );
    console.log(`Número de productos obtenidos: ${productos.length}`);
    return res.status(200).json(productos);
  } catch (error) {
    console.error(`Error al obtener productos: ${error.message}`);
    return res.status(500).json({ error: 'Error al obtener productos' });
  }
};

// Crear un nuevo producto (POST)
const createProduct = async (req, res) => {
  const { nombre_producto, descripcion, unidad_medida } = req.body;
  const stock = parseInt(req.body.stock, 10);
  const id_categoria = parseInt(req.body.id_categoria, 10);
  const id_proveedor = req.body.id_proveedor ? parseInt(req.body.id_proveedor, 10) : null;
  const precio_unidad = parseFloat(req.body.precio_unidad);
  let imagen = null;

  if (req.file) {
    imagen = `/images/${req.file.filename}`;
    console.log(`Imagen del nuevo producto guardada como: ${imagen}`);
  }

  console.log('Creando nuevo producto con los siguientes datos:', {
    nombre_producto,
    descripcion,
    stock,
    imagen,
    id_categoria,
    id_proveedor,
    unidad_medida,
    precio_unidad,
  });

  try {
    await sequelize.query(
      'INSERT INTO productos (nombre_producto, descripcion, stock, imagen, id_categoria, id_proveedor, unidad_medida, precio_unidad) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      {
        replacements: [
          nombre_producto,
          descripcion,
          stock,
          imagen,
          id_categoria,
          id_proveedor,
          unidad_medida,
          precio_unidad,
        ],
        type: QueryTypes.INSERT,
      }
    );
    console.log('Producto creado correctamente.');
    return res.status(201).json({ message: 'Producto creado correctamente' });
  } catch (error) {
    console.error(`Error al crear producto: ${error.message}`);
    return res.status(500).json({ error: 'Error al crear producto' });
  }
};

// Actualizar un producto (PUT)
const updateProduct = async (req, res) => {
  const { id_producto, nombre_producto, descripcion, unidad_medida } = req.body;
  const stock = parseInt(req.body.stock, 10);
  const id_categoria = parseInt(req.body.id_categoria, 10);
  const id_proveedor = req.body.id_proveedor ? parseInt(req.body.id_proveedor, 10) : null;
  const precio_unidad = parseFloat(req.body.precio_unidad);
  let updateFields = [
    nombre_producto,
    descripcion,
    stock,
    id_categoria,
    id_proveedor,
    unidad_medida,
    precio_unidad,
  ];
  let query =
    'UPDATE productos SET nombre_producto = ?, descripcion = ?, stock = ?, id_categoria = ?, id_proveedor = ?, unidad_medida = ?, precio_unidad = ?';

  if (req.file) {
    const imagen = `/images/${req.file.filename}`;
    query += ', imagen = ?';
    updateFields.push(imagen);
    console.log(`Actualizando producto con nueva imagen: ${req.file.filename}`);
  }

  query += ' WHERE id_producto = ?';
  updateFields.push(parseInt(id_producto, 10));

  console.log('Actualizando producto con los siguientes datos:', {
    id_producto,
    nombre_producto,
    descripcion,
    stock,
    id_categoria,
    id_proveedor,
    unidad_medida,
    precio_unidad,
  });

  try {
    await sequelize.query(query, {
      replacements: updateFields,
      type: QueryTypes.UPDATE,
    });
    console.log('Producto actualizado correctamente.');
    return res.status(200).json({ message: 'Producto actualizado correctamente' });
  } catch (error) {
    console.error(`Error al actualizar producto: ${error.message}`);
    return res.status(500).json({ error: 'Error al actualizar producto' });
  }
};

// Eliminar un producto (DELETE)
const deleteProduct = async (req, res) => {
  const { id_producto } = req.query;

  console.log(`Eliminando producto con ID: ${id_producto}`);

  if (!id_producto) {
    console.error('ID de producto no proporcionado en la solicitud DELETE.');
    return res.status(400).json({ error: 'ID de producto es requerido para eliminar.' });
  }

  try {
    await sequelize.query('DELETE FROM productos WHERE id_producto = ?', {
      replacements: [parseInt(id_producto, 10)],
      type: QueryTypes.DELETE,
    });
    console.log('Producto eliminado correctamente.');
    return res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error(`Error al eliminar producto: ${error.message}`);
    return res.status(500).json({ error: 'Error al eliminar producto' });
  }
};

// Obtener todos los proveedores (GET)
const getAllProveedores = async (req, res) => {
  try {
    console.log('Consultando todos los proveedores en la base de datos...');
    const proveedores = await sequelize.query('SELECT id_proveedor, nombre FROM proveedores', {
      type: QueryTypes.SELECT,
    });
    console.log(`Número de proveedores obtenidos: ${proveedores.length}`);
    return res.status(200).json(proveedores);
  } catch (error) {
    console.error(`Error al obtener proveedores: ${error.message}`);
    return res.status(500).json({ error: 'Error al obtener proveedores' });
  }
};

// Obtener todas las categorías (GET)
const getAllCategorias = async (req, res) => {
  try {
    console.log('Consultando todas las categorías en la base de datos...');
    const categorias = await sequelize.query('SELECT id_categoria, nombre_categoria FROM categorias', {
      type: QueryTypes.SELECT,
    });
    console.log(`Número de categorías obtenidas: ${categorias.length}`);
    return res.status(200).json(categorias);
  } catch (error) {
    console.error(`Error al obtener categorías: ${error.message}`);
    return res.status(500).json({ error: 'Error al obtener categorías' });
  }
};
