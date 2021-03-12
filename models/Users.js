const { Model, DataTypes } = require('sequelize');
const bcrypt = require("bcrypt");
const sequelize = require('../config/connection');

class User extends Model {
    passwordCheck(userPassword) {
        return bcrypt.compareSync(userPassword, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
            validate: {
                len: [4, 16]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6, 16]
            }
        }
    }, {
    hooks: {
        beforeCreate: async (adminData) => {
            adminData.password = await bcrypt.hash(adminData.password, 10);
            return adminData;
        },
        beforeUpdate: async (adminData) => {
            adminData.password = await bcrypt.hash(adminData.password, 10);
            return adminData;
        }
    },
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "User",
    timestamps: false
});

module.exports = User;