import DefaultModel from '../models/Default.model';

module.exports = (sequelize, DataTypes) => {
  class User extends DefaultModel {
    static associate(models) {
      models.user.hasOne(models.personalData, {
        foreignKey: 'userDataId',
        as: 'userData',
      });
      models.user.belongsToMany(models.role, {
        through: models.userRoles,
      });
      models.user.hasMany(models.usefulContacts, {
        foreignKey: 'ownerId',
        as: 'owner',
      });
      models.user.hasMany(models.usefulContacts, {
        foreignKey: 'mentorId',
        as: 'mentor',
      });
      models.user.hasMany(models.usefulContacts, {
        foreignKey: 'curatorKdlId',
        as: 'curatorKdl',
      });
      models.user.hasMany(models.usefulContacts, {
        foreignKey: 'hrPartnerId',
        as: 'hrPartner',
      });
      models.user.hasMany(models.usefulContacts, {
        foreignKey: 'timekeeperId',
        as: 'timekeeper',
      });
      models.user.hasMany(models.usefulContacts, {
        foreignKey: 'deputyUserId',
        as: 'deputyUser',
      });
      models.user.belongsTo(models.status, {
        foreignKey: 'statusId',
        as: 'status',
      });
      models.user.belongsTo(models.workPosition, {
        foreignKey: 'workPositionId',
        as: 'workPosition',
      });
      models.user.belongsTo(models.user, {
        foreignLey: 'managerId',
        as: 'manager',
      });
    }
  }
  User.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      fio: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING },
      phone: { type: DataTypes.STRING },
    },
    {
      sequelize,
      modelName: 'user',
      timestamps: true,
    },
  );
  return User;
};
