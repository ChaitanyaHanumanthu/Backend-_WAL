"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "samples",
      [
        {
          id: 1,
          name: "Chaitanya",
          age: 21,
          phone: 7789846,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: "Chinna",
          age: 19,
          phone: 7894658,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  //bulk delete - when we down the seed
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("samples", null, {});
  },
};
