const fs = require('fs');
const path = require('path');

const newId = require ('./newId');

const userIdPath = newId.userIdPath;

if (!fs.existsSync(userIdPath)){
    fs.mkdirSync(userIdPath);
    };


const productIdPath = newId.productIdPath;
if (!fs.existsSync(productIdPath)){
    fs.mkdirSync(productIdPath);   
    };


const dirPaths = {
        userIdPath,
        productIdPath, 
       
};

module.exports = dirPaths;