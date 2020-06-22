// Requires Json read
const fs = require('fs');
const path = require('path');
const products = require('../../middlewares/jsonRead');

// Requires Sequelize Models
const db = require('../models');

// Array construction for DB upload in bulk create
let prodToCreate = [];
products.products.forEach(producto => {
    prodToCreate.push({
        name: producto.name,
        description: producto.description,
        price: producto.price,
        image: producto.image,
    })
});

console.log(prodToCreate);

// categorías
let categToCreate = [
    { category: 'Indumentaria' },
    { category: 'Tecnologia' },
    { category: 'Entretenimiento' },
    { category: 'Electrodomesticos' },
];

console.log(categToCreate);

// descuentos
let discoToCreate = [
    { discount: 10 },
    { discount: 20 },
    { discount: 30 },
];

console.log(discoToCreate);

// Alter table CATEGORIES- adjustments to existing model
db.Category.sync({ alter: true })
    .then((categTable) => {
        console.log(`    => the table Category has just created!`);

        // Product DB upload
        db.Product.bulkCreate(categToCreate)
            .then((result) => {
                console.log('    => Categorías creados en DB')
            })
            .catch((err) => { console.log(err) });
    })
    .catch((err) => { console.log(err) });

// Alter table DISCOUNT- adjustments to existing model
db.Discount.sync({ alter: true })
    .then((discTable) => {
        console.log(`    => the table Discount has just created!`);

        // Product DB upload
        db.Product.bulkCreate(discoToCreate)
            .then((result) => {
                console.log('    => Discounts creados en DB')
            })
            .catch((err) => { console.log(err) });
    })
    .catch((err) => { console.log(err) });

// Alter table PRODUCTS - adjustments to existing model
db.Product.sync({ alter: true })
    .then((prodTable) => {
        console.log(`the table Products has just created!`);

        // Product DB upload
        db.Product.bulkCreate(prodToCreate)
            .then((result) => {
                console.log('Productos creados en DB')
            })
            .catch((err) => { console.log(err) });
    })
    .catch((err) => { console.log(err) });