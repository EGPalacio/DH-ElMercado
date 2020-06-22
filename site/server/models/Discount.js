module.exports = (sequelize, dataTypes) => {
    let alias = "Discounts";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremet: true,
            allowNull: false,
        },
        category: {
            type: dataTypes.TINYINT(4),
            allowNull: false,
        }
    };
    let config = {
        tableName: "discounts",
        timestamps: false,
    };
    const Discount = sequelize.define(alias, cols, config);

    Discount.associate = function(models) {
        Discount.hasMany(models.Product, {
            as: "products",
            foreignKey: "discount_id",
        })
    };

    return Discount;
}