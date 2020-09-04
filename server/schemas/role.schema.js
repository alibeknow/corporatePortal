import DefaultModel from '../models/Default.model';

module.exports = (sequelize, DataTypes) => {
  class Role extends DefaultModel {
    static associate(models) {
      models.role.belongsToMany(models.user, {
        through: models.userRoles,
        foreignKey: 'roleId',
        otherKey: 'userId',
        as: 'role',
      });
    }
  }
  Role.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'role',
      timestamps: true,
    },
  );
  return Role;
};
