'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Professionals', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            firstName: {
                allowNull: false,
                type: Sequelize.STRING
            },
            lastName: {
                allowNull: false,
                type: Sequelize.STRING
            },
            userId: {
                allowNull: false,
                type: Sequelize.UUID,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            phoneNumber: {
                allowNull: false,
                type: Sequelize.STRING
            },
            profession: {
                allowNull: false,
                type: Sequelize.STRING
            },
            description: {
                allowNull: true,
                type: Sequelize.STRING
            }
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Users');
    }
};