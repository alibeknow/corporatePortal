import DefaultModel from '../models/Default.model';

module.exports = (sequelize, DataTypes) => {
  class WorkPosition extends DefaultModel {
    static associate(models) {
      models.workPosition.hasMany(models.user, {
        foreignKey: 'workPositionId',
        as: 'workPosition',
      });
    }
  }
  WorkPosition.init(
    {
      name: {
        type: DataTypes.STRING(255),
      },
    },
    {
      sequelize,
      modelName: 'workPosition',
      timestamps: true,
    },
  );
  return WorkPosition;
};
