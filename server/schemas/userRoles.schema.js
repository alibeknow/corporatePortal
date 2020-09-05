import DefaultModel from '../models/Default.model';

module.exports = (sequelize, DataTypes) => {
  class UserRoles extends DefaultModel {}
  UserRoles.init(
    {
      iid: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
