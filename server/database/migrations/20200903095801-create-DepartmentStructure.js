
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('department_structures', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
      },
      name: {
        type: Sequelize.STRING(255),
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      parent_department_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'department_structures',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('department_structures');
  },
};
