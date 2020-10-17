import DefaultModel from "../models/Default.model";

module.exports = (sequelize, DataTypes) => {
  class GeoPoint extends DefaultModel {
    static associate(models) {
      models.geoPoint.hasMany(models.user);
      models.geoPoint.hasMany(models.city);
    }
  }
  GeoPoint.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING(255)
      },
      coordinates: {
        type: DataTypes.GEOMETRY("POINT")
      }
    },
    {
      sequelize,
      modelName: "geoPoint",
      timestamps: true
    }
  );
  return GeoPoint;
};
