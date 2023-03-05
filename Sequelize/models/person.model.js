const { DataTypes } = require("sequelize");
const sequelize = require("../db/db.config");

exports.Person = sequelize.define(
  "person",
  {
    person_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    person_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    timestamps: false,
    freezeTableName: true,
  }
);

(async () => {
  await this.Person.sync();
})();
