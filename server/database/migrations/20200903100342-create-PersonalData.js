module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('personal_data', {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    userId: {
      type: Sequelize.UUID,
      references: { model: 'users', key: 'id' },
      onDelete: 'CASCADE',
    },
    dateBirth: {
      type: Sequelize.DATE,
    },
    passport: {
      type: Sequelize.TEXT,
    },
    registration: {
      type: Sequelize.TEXT,
    },
    snils: {
      type: Sequelize.STRING(16),
    },
    education: {
      type: Sequelize.STRING(255),
    },
    married_status: {
      type: Sequelize.ENUM,
      values: ['single', 'married', 'divorced'],
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('personal_data'),
};
