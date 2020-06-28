const fs = require ('fs');
let arrayProductos = require('../articulosJS');
const path = require('path');
const cartFilePath = path.join(__dirname, '../data/cart.json');


module.exports = {
    cartStart: (req,res) => {
        var user = req.session.usuarioLogueado
        res.render('cart', {title: 'cart', user: user})
    },
    cartAdd: (req,res) => {
        var user = req.session.usuarioLogueado
        let productId = Number(req.params.id);
        let productCantidad = req.body.cantidad;

        let productToAdd = arrayProductos.find(product => product.id == productId)

        productToAdd = {
			id: productToAdd.id,
            cantida: productCantidad,
            };

        fs.appendFileSync(cartFilePath, JSON.stringify(productToAdd, null, '\t'));
        res.redirect('/cart/', {user : user});
    }
}