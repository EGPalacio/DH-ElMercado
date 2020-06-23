let arrayProductos = require('../articulosJS');

const pdtosInSale = arrayProductos.filter(pdto => pdto.category == 'in-sale');
const pdtosVisited = arrayProductos.filter(pdto => pdto.category == 'visited');

const db = require('../server/models');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");



 let indexControllers = {
        index: (req,res) => {
            /* let index = arrayProductos;
            res.render('index',{
                "index":index,
                pdtosInSale,
                pdtosVisited,
                thousandGenerator: toThousand,
            }); */

            db.Product.findAll({
               /*  include: [{association: "Discounts"}, {association: "Categories"} ] */
            })
            .then(function(products){
                res.render("index", {
                    products:products,
                    thousandGenerator: toThousand,
                })
            })
        },
        blog : (req, res) => {
            res.render('blog')
        },

        prueba : (req, res) => {
            db.Product.findAll()
            .then(function(products){
                res.render("prueba", {products:products})
            })

        },
    };

module.exports = indexControllers;
