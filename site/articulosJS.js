let fs = require('fs');
let path = require('path');

let arrayArticulos = JSON.parse(fs.readFileSync(path.join(__dirname, './data/productsDatabase.json'), 'utf-8'));

module.exports = arrayArticulos;
