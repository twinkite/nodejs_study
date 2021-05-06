const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            name: {
                type: Sequelize.STRING(20),
                allowNUll: false,
                unique: true,
            },
            age:{
                type:Sequelize.INTEGER.UNSIGNED,
                aloowNull: false,
            },
            married: {
                type: Sequelize.BOOLEAN, // ture, false
                allowNull: false,
            },
            comment:{
                type: Sequelize.TEXT,
                allowNull: true,
            },
            created_at:{
                type: Sequelize.DATE,   //DATETIME, MYSQL DATE -> sequelize DateOnly
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            // createdAt, updateAt, deletedAt: ture // soft delete.  진짜 지우면 복구가 빡셈. 
        },{
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

    static associate(db){
        db.User.hasMany(db.Comment, {foreignKey:'commenter', sourceKey: 'id'});
    }
};