const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const newUserId = users[users.length - 1].id+1;
const userIdPath = path.join(__dirname, '../public/images/avatars/' + newUserId)

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const newProductId = products[products.length - 1].id + 1;
const productIdPath = path.join(__dirname, '../public/images/products/' + newProductId)

const newId = {
    newUserId,
    userIdPath,
    newProductId,
    productIdPath 
   
};

module.exports = newId;