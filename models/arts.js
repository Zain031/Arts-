'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Arts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //User.hasOne(models.Profile,{forenKey :UserId})
    }
    get formatDate() {
      // Get year, month, and day part from the date
      let year = this.date.toLocaleString("default", {
        year: "numeric"
      });
      let month = this.date.toLocaleString("default", {
        month: "2-digit"
      });
      let day = this.date.toLocaleString("default", {
        day: "2-digit"
      });

      // Generate yyyy-mm-dd date string
      return year + "-" + month + "-" + day;
    }


  }
  Arts.init({
    name: DataTypes.STRING,
    artist: DataTypes.STRING,
    date: DataTypes.DATE,
    description: DataTypes.TEXT,
    photo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Arts',
  });
  return Arts;
};