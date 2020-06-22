module.exports = (sequelize, DataTypes) => {
    const UserType = sequelize.define("UserTypes", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        userType: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
    }, {
        tableName: 'userTypes',
        timestamps: false,
    });

    UserType.associate = function(models) {
        UserType.hasMany(models.User, {
            as: "users",
            foreignKey: "user_type_id",
        })
    };

    return UserType;
}