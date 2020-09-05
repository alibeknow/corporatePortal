
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_roles', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      role_id: {
        type: Sequelize.UUID,
        unique: 'user_roles_role_id_unique',
        references: {
          model: 'roles',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      user_id: {
        type: Sequelize.UUID,
        unique: 'user_roles_user_id_unique',
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('user_roles');
  },
};
