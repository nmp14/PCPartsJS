const Writer = require("./Write");

const UserParts = function (buildName) {
    this.buildName = buildName;
    this.parts = {};
    this.listParts = () => {
        for (const [key, value] of Object.entries(this.parts)) {
            console.log(`${key}: ${value}`);
        }
    }
}

UserParts.prototype.addPart = function (hardware, name) {
    this.parts[hardware] = name;
}

UserParts.prototype.removePart = function (hardware) {
    if (this.parts[hardware]) {
        delete this.parts[hardware];
        return;
    }
    console.log("Part wasn't found");
}

module.exports = UserParts