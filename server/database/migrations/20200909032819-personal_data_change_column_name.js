module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('personal_data', 'personal_data_userId_fkey');
    await queryInterface.renameColumn('personal_data', 'userId', 'user_id');
    await queryInterface.addConstraint('personal_data', {
      fields: ['user_id'],
      type: 'FOREIGN KEY',
      name: 'personal_data_userId_fkey',
      references: { table: 'users', field: 'id' },
    });
  },
  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
