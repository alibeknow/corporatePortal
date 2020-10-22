<<<<<<< HEAD
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
=======
import DefaultModel from '../models/Default.model';

module.exports = (sequelize, DataTypes) => {
  class GeoPoint extends DefaultModel {
    static associate(models) {
      models.geoPoint.belongsTo(models.user);
      models.geoPoint.belongsTo(models.city);
    }
  }
  GeoPoint.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING(255),
      },
      coordinates: {
        type: DataTypes.GEOMETRY('POINT'),
      },
    },
    {
      sequelize,
      modelName: 'geoPoint',
      timestamps: true,
    },
  );
  return GeoPoint;
};
>>>>>>> 5e44f60f2e8ab690c58f606ee653c7fedea786aa
