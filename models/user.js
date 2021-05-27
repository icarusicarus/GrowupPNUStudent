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
        }, {
            sequelize,
            timestamps: false,  // true로 둘 경우 original: Error: Unknown column 'createdAt' in 'field list'라는 에러가 떠서 수정함
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
};
