module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('user_roles', {
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    role_id: {
      type: Sequelize.UUID,
      primaryKey: true,
      references: {
        model: 'roles',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    user_id: {
      type: Sequelize.UUID,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('user_roles'),
};
