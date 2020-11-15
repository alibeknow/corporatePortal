import DefaultModel from '../models/Default.model';

module.exports = (sequelize, DataTypes) => {
  class GeoPoint extends DefaultModel {
    static associate(models) {
      models.geoPoint.belongsTo(models.user);
      models.geoPoint.belongsTo(models.city);
      models.geoPoint.hasMany(models.uploads, {foreign_key: 'pointId'});
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
        unique: true,
      },
      description: {
        type: DataTypes.JSONB,
      },
      google_link: {
        type: DataTypes.TEXT
      }
    },
    {
      sequelize,
      modelName: 'geoPoint',
      timestamps: true,
    },
  );
  return GeoPoint;
};
