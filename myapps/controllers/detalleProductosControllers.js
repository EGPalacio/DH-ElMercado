let arrayProductos = require('../articulosJS');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

let productoControllers = {
    productos: (req,res) => {
        let index = arrayProductos;
        let pdtoID = req.params.id;
        let productFind = arrayProductos.find(pdto => pdto.id == pdtoID);
        console.log(productFind);

        res.render('detalleProductos', {
            "index":index,
            productFind,
			thousandGenerator: toThousand
        });
    }
};

module.exports = productoControllers;
