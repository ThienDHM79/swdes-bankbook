'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany( models.Bankbook, { foreignKey: 'customerId'});
      
    }
  }
  Customer.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    cmnd: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    } 
  }, {
    sequelize,
    modelName: 'Customer',
  });
  return Customer;
};