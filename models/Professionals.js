'use strict';
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Professionals', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,

            allowNull: false,
            primaryKey: true
        },
        firstName: {
            allowNull: false,
            type: DataTypes.STRING
        },
        lastName: {
            allowNull: false,
            type: DataTypes.STRING
        },
        UserId: {
            allowNull: false,
            type: DataTypes.UUID,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        phoneNumber: {
            allowNull: false,
            type: DataTypes.STRING
        },
        profession: {
            allowNull: false,
            type: DataTypes.STRING
        },
        description: {
            allowNull: true,
            type: DataTypes.STRING
        }
    });
};