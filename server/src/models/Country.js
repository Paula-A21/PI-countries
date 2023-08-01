const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Country', {
    id:{ //es el id de 3 letras particular de cada país, cca3 así me llega de la API
      type: DataTypes.STRING, 
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    flags: {
      type: DataTypes.STRING, //tipo de imagen?
      allowNull:false
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capital: {
      type: DataTypes.STRING, // Cambiar el tipo de dato a STRING
      allowNull:false,
    },
    subregion:{
      type: DataTypes.STRING,
      allowNull:true
    },
    area:{
      type: DataTypes.DECIMAL,
      allowNull:true
    },
    population:{
      type: DataTypes.INTEGER,
      allowNull:false
    }
  },
  {
    timestamps:false
  }
  )};