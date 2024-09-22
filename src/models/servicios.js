const { DataTypes } = require('sequelize');
const { sequelize } = require('../db'); // Importa tu conexión a la base de datos

const Servicio = sequelize.define('Servicio', {
  id_servicio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre_servicio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  duracion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo_servicio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false, // No necesitamos las columnas createdAt y updatedAt
  tableName: 'servicios', // Especificamos el nombre de la tabla
});

module.exports = Servicio;
