module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('personal_data', 'dateBirth', 'date_birth');
    await queryInterface.removeConstraint('users', 'users_department_id_fkey');
    await queryInterface.renameColumn('users', 'department_id', 'department_stractures_id');
    await queryInterface.addConstraint('personal_data', {
      fields: ['user_id'],
      type: 'FOREIGN KEY',
      name: 'users_department_id_fkey',
      references: { table: 'users', field: 'id' },
    });
  },

  down: async (queryInterface, Sequelize) => await queryInterface.renameColumn('personal_data', 'date_birth', 'dateBirth'),
};
