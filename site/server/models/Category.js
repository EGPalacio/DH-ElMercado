module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("Categories", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
    }, {
        tableName: 'categories',
        timestamps: false,
    });

    Category.associate = function(models) {
        Category.hasMany(models.Product, {
            as: "products",
            foreignKey: "category_id",
        })
    };

    return Category;
}