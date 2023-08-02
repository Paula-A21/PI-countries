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
            type: DataTypes.TIME,
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