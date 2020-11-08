import DefaultModel from '../models/Default.model';

module.exports = (sequelize, DataTypes) => {
  class DepartmentStructure extends DefaultModel {
    static associate(models) {
      models.departmentStructure.hasMany(models.user);
      models.departmentStructure.belongsTo(models.departmentStructure);
    }
  }
  DepartmentStructure.init(
    {
      id: {
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
      modelName: 'departmentStructure',
      timestamps: true,
    },
  );
  return DepartmentStructure;
};
