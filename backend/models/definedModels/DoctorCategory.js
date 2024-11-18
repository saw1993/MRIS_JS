const { Model, DataTypes } = require('sequelize');

class DoctorCategory extends Model {
  // Static method to initialize the model with a dynamic sequelize instance
  static initModel(sequelize) {
    DoctorCategory.init({
      category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      category_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'DoctorCategory',
      tableName: 'doctor_category',
      timestamps: false,
    });
  }
}

module.exports = DoctorCategory;