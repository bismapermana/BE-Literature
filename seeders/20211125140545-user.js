"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Users", [
      {
        fullName: "admin",
        email: "admin@gmail.com",
        password:
          "$2a$10$4N48b9ha1gpZKbQh4Oyq0u9SgD36MYUB5YJFkgC0MguzzDoMsqaXG",
        phone: "0812839203",
        address: "bandung, jawabarat",
        status: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
