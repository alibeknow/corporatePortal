module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('department_structures', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
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
  }),

  down: (queryInterface) => queryInterface.dropTable('department_structures'),
};
