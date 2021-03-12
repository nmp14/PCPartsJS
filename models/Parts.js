const { Model, DataTypes } = require("sequelize");

class Parts extends Model { }

Parts.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    hardware: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    build_id: {
        references: {
            model: "build",
            key: "id"
        }
    }
}, {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    modelName: "parts"
});

module.exports = Parts;