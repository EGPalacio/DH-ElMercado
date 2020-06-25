module.exports = (sequelize, DataTypes) => {
    let alias = "Product";
    
    let cols = {
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
    };
    
    let config = {
        tableName: 'products',
        timestamps: false,
    };


    const Product = sequelize.define (alias, cols, config);
   
    Product.associate = function (models) {
        Product.belongsTo(models.Category, {
            as : "categories",
            foreignKey : "category_id"
        })

        Product.belongsTo(models.Discount, {
            as : "discounts",
            foreignKey : "discount_id"
        });
    }

    return Product;
}