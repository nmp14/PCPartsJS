const User = require("./Users");
const Build = require("./Builds");
const Parts = require("./Parts");

User.hasMany(Build, {
    foreignKey: "user_id",
    onDelete: "CASCADE"
});

Build.belongsTo(User, {
    foreignKey: "user_id"
});

Build.hasMany(Parts, {
    foreignKey: "build_id",
    onDelete: "CASCADE"
});

Parts.belongsTo(Build, {
    foreignKey: "build_id"
});

module.exports = { User, Build, Parts };