const fs = require('fs');
const path = require('path');
let arrayProductos = require('../articulosJS');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const newId = require('../middlewares/newId');

const newProductId = newId.newProductId;







let productControllers = {
    productos: (req,res) => {
        let index = arrayProductos;
        res.render('detalleProductos', {"index":index});
    },
    add:  (req,res) => {

        
        res.render('addProduct');
    },
    store: (req, res) => {
        var portada = req.files.imgPortada[0].filename;
		req.body.price = Number(req.body.price);
		req.body.discount = Number(req.body.discount);
		let newProduct = {
			id: newProductId,
            ...req.body,
            
            image : portada,
            
            
			
        };
        
		let finalProducts = [...products, newProduct];
        fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));
        
        res.redirect('/');
    }
};

module.exports = productControllers;