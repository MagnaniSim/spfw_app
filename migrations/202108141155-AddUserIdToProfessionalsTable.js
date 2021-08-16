'use strict';

const columnAndTypes = [{
    name: 'UserId',
    type: (Sequelize) => {
        return {
            type: Sequelize.UUID,
            allowNull: true,
            references: {
                model: 'Users',
                key: 'id'
            }
        }
    }
}];

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all(
            columnAndTypes.map(c => {
                return queryInterface.addColumn(
                    'Professionals',
                    c.name,
                    c.type(Sequelize)
                )
            })
        );
    },
    down: (queryInterface, Sequelize) => {
        return Promise.all(
            columnAndTypes.map(c => {
                return queryInterface.removeColumn(
                    'Professionals',
                    c.name,
                )
            })
        )
    }
};