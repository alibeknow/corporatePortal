

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
      },
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fio: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING },
      phone: { type: Sequelize.STRING },
      department_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'department_structures',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      status_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'statuses',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      work_position_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'work_positions',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      manager_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async () => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
