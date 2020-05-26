const fs = require('fs');
const path = require('path');
let arrayProductos = require('../articulosJS');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));




let productControllers = {
    productos: (req,res) => {
        let index = arrayProductos;
        res.render('detalleProductos', {"index":index});
    },
    add:  (req,res) => {

        
        res.render('addProduct');
    },
    store: (req, res) => {
        console.log(req.file.originalname)
		req.body.price = Number(req.body.price);
		req.body.discount = Number(req.body.discount);
		let newProduct = {
			id: products[products.length - 1].id + 1,
            ...req.body,
            image : req.file.originalname,
            galeria : req.files,
            
			
		};
		let finalProducts = [...products, newProduct];
        fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));
        console.log(req.files)
        res.redirect('/');
    }
};

module.exports = productControllers;