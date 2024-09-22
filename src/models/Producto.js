const { DataTypes } = require('sequelize');
const { sequelize } = require('../db'); // Importa tu conexión a la base de datos

const Producto = sequelize.define('Producto', {
  id_producto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_producto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  precio_unidad: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  unidad_medida: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  id_categoria: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Categorias',
      key: 'id_categoria',
    },
    onDelete: 'SET NULL',
    allowNull: false,
  },
  id_proveedor: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Proveedores',
      key: 'id_proveedor',
    },
    onDelete: 'SET NULL',
  },
}, {
  timestamps: true, // Activar timestamps si se requiere createdAt y updatedAt
  tableName: 'productos',
});

module.exports = Producto;
