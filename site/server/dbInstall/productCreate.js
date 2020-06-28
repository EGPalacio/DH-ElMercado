// Requires Json read
const fs = require('fs');
const path = require('path');
const products = require('../../middlewares/jsonRead');

// Requires Sequelize Models
const db = require('../models');

// categorías
let categToCreate = [{
        id: 1,
        category: 'Indumentaria'
    },
    {
        id: 2,
        category: 'Tecnologia'
    },
    {
        id: 3,
        category: 'Entretenimiento'
    },
    {
        id: 4,
        category: 'Electrodomesticos'
    },
];

console.log(categToCreate);

// descuentos
let discoToCreate = [{
        id: 1,
        discount: 10
    },
    {
        id: 2,
        discount: 20
    },
    {
        id: 3,
        discount: 30
    },
];

console.log(discoToCreate);

// Array construction for DB upload in bulk create
let prodToCreate = [];
products.products.forEach(producto => {
    prodToCreate.push({
        name: producto.name,
        description: producto.description,
        price: producto.price,
        image: producto.image,
        category_id: producto.category_id,
        discount_id: producto.discount_id,
        createdAt: new Date(),
        updatedAt: new Date(),
    })
});

console.log(prodToCreate);

// Alter table CATEGORIES- adjustments to existing model
db.Category.sync({ alter: true })
    .then((categTable) => {
        console.log(`    => the table Category has just created!`);

        // Product DB upload
        db.Category.bulkCreate(categToCreate)
            .then((result) => {
                console.log('    => Categorías creados en DB')

                // Alter table DISCOUNT- adjustments to existing model
                db.Discount.sync({ alter: true })
                    .then((discTable) => {
                        console.log(`    => the table Discount has just created!`);

                        // Product DB upload
                        db.Discount.bulkCreate(discoToCreate)
                            .then((result) => {
                                console.log('    => Discounts creados en DB')

                                // Alter table PRODUCTS - adjustments to existing model
                                db.Product.sync({ alter: true })
                                    .then((prodTable) => {
                                        console.log(`the table Products has just created!`);

                                        // Product DB upload
                                        db.Product.bulkCreate(prodToCreate)
                                            .then((result) => {
                                                console.log('Productos creados en DB');

                                                // Product Elim Null items
                                                db.Product.destroy({
                                                        where: {
                                                            name: 'Eliminar'
                                                        },
                                                    })
                                                    .then((distroyResult) => {
                                                        console.log(`destroy completed - product DB clean`);
                                                        console.log(distroyResult);
                                                    })
                                                    // Catch distroy null products
                                                    .catch((err) => { console.log(err) });
                                            })
                                            // Catch bulkCreate Products
                                            .catch((err) => { console.log(err) });
                                    })
                                    // Catch alterTable Products
                                    .catch((err) => { console.log(err) });

                            })
                            // Catch bulkCreate Discounts
                            .catch((err) => { console.log(err) });
                    })
                    // Catch alterTable Discounts
                    .catch((err) => { console.log(err) });

            })
            // Catch bulkCreate Categories
            .catch((err) => { console.log(err) });
    })
    // Catch alterTables Categories Categories
    .catch((err) => { console.log(err) });