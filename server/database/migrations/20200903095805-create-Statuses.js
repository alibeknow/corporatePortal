
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('statuses', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.ENUM,
        values: ['active', 'fired', 'vacation'],
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('statuses');
  },
};
