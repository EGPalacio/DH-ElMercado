let db = require ("../../server/models");

let productsController = {
    list: function(req, res) {
        db.Product.findAll()
        .then(function(products){
            res.send(products)
        })
    }
}

module.exports = productsController;