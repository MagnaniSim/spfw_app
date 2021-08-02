'use strict';
module.exports = (sequelize, DataTypes) => {
    var Users = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,

            allowNull: false,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        }
    })
    return Users;
};