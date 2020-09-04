import DefaultModel from '../models/Default.model';

module.exports = (sequelize, DataTypes) => {
  class UsefulContacts extends DefaultModel {
    static associate(models) {
      models.usefulContacts.belongsTo(models.user, {
        foreignKey: 'ownerId',
        as: 'owner',
      });
      models.usefulContacts.belongsTo(models.user, {
        foreignKey: 'mentorId',
        as: 'mentor',
      });
      models.usefulContacts.belongsTo(models.user, {
        foreignKey: 'curatorKdlId',
        as: 'curator_kdl',
      });
      models.usefulContacts.belongsTo(models.user, {
        foreignKey: 'hrPartnerId',
        as: 'hrPartner',
      });
      models.usefulContacts.belongsTo(models.user, {
        foreignKey: 'timekeeperId',
        as: 'timekeeper',
      });
      models.usefulContacts.belongsTo(models.user, {
        foreignKey: 'deputyuserId',
        as: 'deputyuser',
      });
    }
  }
  UsefulContacts.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
      },
    },
    {
      sequelize,
      modelName: 'usefulContacts',
      timestamps: true,
    },
  );
  return UsefulContacts;
};
