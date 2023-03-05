const { DataTypes } = require("sequelize");
const sequelize = require("../db/db.config");

exports.Job = sequelize.define(
  "job",
  {
    job_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    job_name: {
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

// (async () => await this.Jobs.sync())();
