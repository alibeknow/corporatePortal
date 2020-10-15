import DefaultModel from "../models/Default.model";

module.exports = (sequelize, DataTypes) => {
  class WorkPosition extends DefaultModel {
    static associate(models) {
      models.workPosition.hasMany(models.user);
    }
  }
  WorkPosition.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING(255)
      }
    },
    {
      sequelize,
      modelName: "workPosition",
      timestamps: true
    }
  );
  return WorkPosition;
};
