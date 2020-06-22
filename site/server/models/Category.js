module.exports = (sequelize, dataTypes) => {
    let alias = "Categories";
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
        tableName: "categories",
        timestamps: false,
    };
    const Category = sequelize.define(alias, cols, config);

    Category.associate = function(models) {
        Category.hasMany(models.Product, {
            as: "products",
            foreignKey: "category_id",
        })
    };

    return Category;
}