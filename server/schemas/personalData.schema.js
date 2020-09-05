import DefaultModel from '../models/Default.model';

module.exports = (sequelize, DataTypes) => {
  class PersonalData extends DefaultModel {
    static associate() {}
  }
  PersonalData.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      dateBirth: { type: DataTypes.DATEONLY },
      passport: { type: DataTypes.TEXT },
      registration: { type: DataTypes.TEXT },
      snils: { type: DataTypes.STRING(16) },
      education: { type: DataTypes.STRING },
      marriedStatus: {
        type: DataTypes.ENUM,
        values: ['single', 'married', 'divorced'],
      },
    },
    {
      sequelize,
      modelName: 'personalData',
      timestamps: true,
    },
  );
  return PersonalData;
};
