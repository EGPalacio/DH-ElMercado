let fs = require('fs');
let path = require('path');

let arrayArticulos = JSON.parse(fs.readFileSync(path.join(__dirname, './data/productsDataBase.json'), 'utf-8'));

module.exports = arrayArticulos;
