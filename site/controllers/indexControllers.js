let arrayProductos = require('../articulosJS');

const pdtosInSale = arrayProductos.filter(pdto => pdto.category == 'in-sale');
const pdtosVisited = arrayProductos.filter(pdto => pdto.category == 'visited');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");



 let indexControllers = {
        index: (req,res) => {
            let index = arrayProductos;
            res.render('index',{
                "index":index,
                pdtosInSale,
                pdtosVisited,
                thousandGenerator: toThousand,
            });
            
        },
        blog : (req, res) => {
            res.render('blog')
        },
    };

module.exports = indexControllers;
