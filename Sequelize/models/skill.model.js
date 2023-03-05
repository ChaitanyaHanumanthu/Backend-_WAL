const { DataTypes } = require("sequelize");
const sequelize = require("../db/db.config");
const { Person } = require("./person.model");

exports.Skill = sequelize.define(
  "skill",
  {
    skill_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    skill: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    person_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Person,
        key: "person_id",
      },
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
  await this.Skill.sync();
})();
