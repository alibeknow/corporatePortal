import DefaultModel from "../models/Default.model";

module.exports = (sequelize, DataTypes) => {
  class User extends DefaultModel {
    static associate(models) {
      models.user.hasOne(models.personalData);
      models.user.belongsToMany(models.role, {
        through: models.userRoles
      });
      models.user.belongsTo(models.status);
      models.user.belongsTo(models.workPosition);
      models.user.belongsTo(models.geoPoint);
      models.user.belongsTo(models.user, {
        foreignLey: "managerId",
        as: "manager"
      });
      models.user.belongsTo(models.departmentStructure);
    }
  }
  User.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING
      },
      fio: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING },
      phone: { type: DataTypes.STRING }
    },
    {
      sequelize,
      modelName: "user",
      timestamps: true
    }
  );
  return User;
};
