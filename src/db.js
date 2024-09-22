const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dbtiendavirtual', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
};

module.exports = { sequelize, connectDB };
