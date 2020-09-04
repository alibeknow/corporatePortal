import DefaultModel from '../models/Default.model';

module.exports = (sequelize, DataTypes) => {
  class Status extends DefaultModel {
    static associate(models) {
      models.status.hasMany(models.user, {
        foreignKey: 'statusId',
        as: 'status',
      });
    }
  }
  Status.init(
    {
      states: {
        type: DataTypes.ENUM,
        values: ['active', 'fired', 'vacation'],
      },
    },
    {
      sequelize,
      modelName: 'status',
      timestamps: true,
    },
  );
  return Status;
};
