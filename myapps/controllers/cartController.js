const fs = require ('fs');
let arrayProductos = require('../articulosJS');
const path = require('path');
const cartFilePath = path.join(__dirname, '../data/cart.json');


module.exports = {
    cartStart: (req,res) => {
        res.render('cart', {title: 'cart'})
    },
    cartAdd: (req,res) => {
        let productId = Number(req.params.id);
        let productCantidad = req.body.cantidad;

        let productToAdd = arrayProductos.find(product => product.id == productId)

        productToAdd = {
			id: productToAdd.id,
			price: Number(productToAdd.price),
			discount: Number(productToAdd.discount),
			category: productToAdd.category,
			description: productToAdd.description,
            image:  productToAdd.image,
            cantida: productCantidad,
            };

        fs.appendFileSync(cartFilePath, JSON.stringify(productToAdd));
        res.redirect('/cart/');
    }
}