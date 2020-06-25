// Require Sequelize
const db = require('../server/models');
const { Sequelize } = require('../server/models');
const Op = Sequelize.Op

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");



module.exports = {
    search: (req, res) => {
        db.Product.findAll({
            where: {
                name:{[db.Sequelize.Op.substring]: req.query.search}
            }
        })
            .then(function(products){
                res.render("browsedProducts", {
                    products: products,
                    thousandGenerator: toThousand,
                });
            })
     }
    }