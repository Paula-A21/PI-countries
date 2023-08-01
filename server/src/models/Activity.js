const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    
    sequelize.define("Activity", {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name:{
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        difficulty:{
            type: DataTypes.DECIMAL,
            validate:{
              "max": 5, 
              "min": 1
            },
            allowNull: false
        },
        duration:{
            //postgres quizás no acepta TIME, así que debería probar usar DATE y sacar solo la hora
            //type: DataTypes.DATE
            type: DataTypes.TIME,
            // type: DataTypes.INTEGER,
            // validate:{
            //     "max":24,
            //     "min":1
            // },
            allowNull: true
        },
        season:{
            type: DataTypes.ENUM("Summer", "Spring", "Winter", "Autumn"),
            allowNull:false
        },
        
    },
    {
        timestamps:false
    })
}