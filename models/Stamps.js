module.exports = function(sequelize, DataTypes) {
  var  Stamps = sequelize.define("Stamps", {
    UID: {
            type: DataTypes.INTEGER,
            notNull: true,
            notEmpty: true,
         },
    Username: {
                type: DataTypes.STRING,
                notNull: true,
                notEmpty: true,
              },
    Country: {
                type: DataTypes.STRING,
                notNull: true,
                notEmpty: true,
             }
  });
  return Stamps;
};