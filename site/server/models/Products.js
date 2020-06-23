module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(1000)
        },
        price: {
            type: DataTypes.DECIMAL
        },
        image: {
            type: DataTypes.STRING(200)
        },
        discount_id: {
            type: DataTypes.INTEGER
        },
        category_id: {
            type: DataTypes.INTEGER
        },
        createdAt: {
            type: DataTypes.DATE
        },
        updatedAt: {
            type: DataTypes.DATE
        },
    }, {
        tableName: 'products',
        timestamps: false,
    });

     Product.associate = (models) => {
        Product.belongsTo(models.Categories, {
            as: 'categories',
            foreignKey: 'category_id',
        });
    };

    Product.associate = (models) => {
        Product.belongsTo(models.Discount, {
            as: 'discounts',
            foreignKey: 'discount_id',
        });
    };

    return Product;
}