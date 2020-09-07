import DefaultModel from '../models/Default.model';

module.exports = (sequelize) => {
  class UserRoles extends DefaultModel {}
  UserRoles.init(
    {},
    {
      sequelize,
      modelName: 'userRoles',
      timestamps: true,
    },
  );
  return UserRoles;
};
