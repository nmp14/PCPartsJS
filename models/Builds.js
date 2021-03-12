const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/connection');

class Build extends Model { }

Build.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        buildName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.STRING,
            references: {
                model: "user",
                key: "id"
            }
        }
    }, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "build"
})

module.exports = Build;