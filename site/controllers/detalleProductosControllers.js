let arrayProductos = require('../articulosJS');

let productoControllers = {
    productos: (req,res) => {
        let index = arrayProductos;
        res.render('detalleProductos', {"index":index});
    }
};

module.exports = productoControllers;
