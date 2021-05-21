//models/user.js
const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            nickname: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            username: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            salt: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            created_at: {
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};
