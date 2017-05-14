module.exports = function(sequelize, DataTypes) {
    var Itinerary = sequelize.define('Itinerary', {
        UID: {
            type: DataTypes.STRING,
            notNull: true,
            notEmpty: true,
        },
        Username: {
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