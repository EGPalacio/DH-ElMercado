let arrayProductos = require('../articulosJS');

const pdtosInSale = arrayProductos.filter(pdto => pdto.category == 'in-sale');
const pdtosVisited = arrayProductos.filter(pdto => pdto.category == 'visited');

const db = require('../server/models');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");



 let indexControllers = {
        index: (req,res) => {

            var user = req.session.usuarioLogueado
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
                    user : user
                })
            })
        },
        blog : (req, res) => {
            var user = req.session.usuarioLogueado
            res.render('blog', {user : user})
        },

        prueba : (req, res) => {
            db.Product.findAll()
            .then(function(products){
                res.render("prueba", {products:products})
            })

        },
        logout : (req, res, next)  => {
            if (req.session) {
              // delete session object
              req.session.destroy(function(err) {
                if(err) {
                  return next(err);
                } else {
                  return res.redirect('/');
                }
              });
            }
          }
    };

module.exports = indexControllers;
