let arrayProductos = require('../articulosJS');

 let indexControllers = {
        index: (req,res) => {
            let index = arrayProductos;
            res.render('index',{"index":index});
        },
    };

module.exports = indexControllers;
