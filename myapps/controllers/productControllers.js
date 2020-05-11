let arrayProductos = require('../articulosJS');




let productControllers = {
    productos: (req,res) => {
        let index = arrayProductos;
        res.render('detalleProductos', {"index":index});
    },
    add:  (req,res) => {
        
        res.render('addProduct');
    }
};

module.exports = productControllers;