'use strict';

const columnAndTypes = [{
    name: 'userId',
    type: (Sequelize) => {
        return {
            type: Sequelize.UUID,
            allowNull: false,
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
                return queryInterface.removeColumn(
                    'Professionals',
                    c.name,
                )
            })
        )
    },

    down: (queryInterface, Sequelize) => {
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
};