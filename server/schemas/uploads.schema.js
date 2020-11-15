import DefaultModel from '../models/Default.model';

module.exports = (sequelize, DataTypes) => {
  class Uploads extends DefaultModel {
    static associate(models) {
      models.uploads.belongsTo(models.geoPoint, {foreign_key: 'pointId'});

    }
  }
  Uploads.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      image: {
        type: DataTypes.TEXT
      }

    },
    {
      sequelize,
      modelName: 'uploads',
      timestamps: true,
    },
  );
  return Uploads;
};
