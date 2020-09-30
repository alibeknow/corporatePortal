import DefaultModel from '../models/Default.model';

module.exports = (sequelize, DataTypes) => {
  class DepartmentStructure extends DefaultModel {
    static associate(models) {
      models.departmentStructure.hasMany(models.user, {
        foreignKey: 'department_stractures_id',
        as: 'department',
      });
      models.departmentStructure.belongsTo(models.departmentStructure, {
        foreignLey: 'parentDepartmentId',
        as: 'parentDepartment',
      });
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
