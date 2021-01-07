"use strict"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert(
        "Users",
        [
          {
            name: "Abdullah",
            surname: "Oğuz",
            email: "abdullah.oguz@mdpgroup.com",
            password: "123456",
            roleId: 1,
            isRemoved: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      )
    }
  },
}
