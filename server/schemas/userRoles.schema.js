import DefaultModel from '../models/Default.model';

module.exports = (sequelize, DataTypes) => {
  class UserRoles extends DefaultModel {}
  UserRoles.init(
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
      modelName: 'userRoles',
      timestamps: true,
    },
  );
  return UserRoles;
};
