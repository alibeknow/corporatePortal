const faker = require('faker/locale/ru');

const users = [...Array(10).keys()].map((index) => ({
  id: faker.random.uuid(),
  fio: `${faker.name.lastName()} ${faker.name.firstName()}`,
  login: `admin${index}`,
  phone: faker.phone.phoneNumber(),
  password: 'c8837b23ff8aaa8a2dde915473ce0991',
  created_at: new Date(),
  updated_at: new Date(),
}));

const personalDatas = [...Array(10).keys()].map((index) => ({
  id: faker.random.uuid(),
  user_id: users[index].id,
  dateBirth: new Date(),
  passport: faker.random.number(),
  registration: faker.address.secondaryAddress(),
  snils: faker.random.number(),
  education: faker.random.word(),
  created_at: new Date(),
  updated_at: new Date(),
}));
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', users);
    await queryInterface.bulkInsert('personal_data', personalDatas);
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null),
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
};
