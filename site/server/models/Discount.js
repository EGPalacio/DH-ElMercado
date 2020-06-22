module.exports = (sequelize, DataTypes) => {
    const Discount = sequelize.define("Discounts", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        discount: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
    }, {
        tableName: 'discounts',
        timestamps: false,
    });

/*     Discount.associate = function(models) {
        Discount.hasMany(models.Product, {
            as: "products",
            foreignKey: "category_id",
        })
    }; */

    return Discount;
}