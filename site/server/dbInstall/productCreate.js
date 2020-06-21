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

// Alter table - adjustments to existing model
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