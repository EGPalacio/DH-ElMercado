module.exports = (sequelize, DataTypes) => {
    let alias = "UserTypes";
    let cols = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        user_type: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
    };

    let config = {
        tableName: 'user_types',
        timestamps: false,
    };

    const UserType = sequelize.define(alias, cols, config);

    UserType.associate = function(models) {
        UserType.hasMany(models.User, {
            as: "users",
            foreignKey: "user_type_id",
        })
    };

    return UserType;
}