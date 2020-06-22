module.exports = (sequelize, dataTypes) => {
    let alias = "UserTypes";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremet: true,
            allowNull: false,
        },
        category: {
            type: dataTypes.STRING(100),
            allowNull: false,
        }
    };
    let config = {
        tableName: "usertypes",
        timestamps: false,
    };
    const UserType = sequelize.define(alias, cols, config);

    UserType.associate = function(models) { /* Esta es la relación uno a muchos, siendo "UserType", el que se relaciona con muchos "Users", checkear si se cumplen las nomenclaturas */
        UserType.hasMany(models.User, {
            as: "users",
            foreignKey: "userType_id",
        })
    };

    return UserType;
}