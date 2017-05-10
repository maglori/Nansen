module.exports = function(sequelize, DataTypes) {
    var Itinerary = sequelize.define('Itinerary', {
        user_id: {
            type: DataTypes.INTEGER,
            notNull: true,
            notEmpty: true,
        },
        user_name: {
            type: DataTypes.STRING,
            notNull: true,
            notEmpty: true,
        },
        itinerary_Item: {
            type: DataTypes.TEXT,
            notNull: true,
            notEmpty: true,
        },
        country_Dest: {
                type: DataTypes.TEXT,
                notNull: true,
                notEmpty: true,
        },
    });
    return Itinerary;
};