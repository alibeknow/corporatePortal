import DefaultModel from '../models/Default.model';

module.exports = (sequelize, DataTypes) => {
  class City extends DefaultModel {
    static associate(models) {
      models.city.belongsTo(models.geoPoint);
    }
  }
  City.init(
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
      modelName: 'city',
      timestamps: true,
    },
  );
  return City;
};
