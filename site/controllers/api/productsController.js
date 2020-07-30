// Require Sequelize
const db = require('../../server/models');
const { Sequelize } = require('../../server/models');
const Op = Sequelize.Op

let sequelize = db.sequelize;

module.exports = {
      list: (req, res) =>{
        db.Product.findAll({
            include: [{association: "categories"}, {association: "discounts"}],
            attributes: ['id', 'name', "description", "price", "image"]
        })
        .then((product) => {
            let tecnologia = 0;
            let electrodomesticos = 0;
            for (let i=0; i<product.length; i++){
                 if(product[i].categories != null){
                     if(product[i].categories.dataValues.category == "Tecnologia"){
                        tecnologia = tecnologia+1
                     }else if(product[i].categories.dataValues.category == "Electrodomesticos"){
                         electrodomesticos++
                     }
                }
                product[i].setDataValue("url", "/api/products/" + product[i].id)

                /* console.log(product[i].categories.dataValues.category) */
            }
            let respuesta = {
                meta: {
                    count: product.length,
                    countByCategory: {
                        "Tecnologia":tecnologia,
                        "Electrodomesticos":electrodomesticos,
                        "Productos": product
                    },
                }
            }
            res.json(respuesta)
        })

        .catch((err) => {
            return res.status(500).json({error: true});
        });
       
       
    },
     /* list: async(req, res) => {
        try{
            const product = await db.Product.findAll({
                include: [{association: "categories"}, {association: "discounts"}]
            });
            const productList = await ((product) => {
                let respuesta = {
                    meta: {
                        count: product.length,
                    }
                }
                console.log(respuesta)
                 res.json(respuesta);
            })


        } catch(error){
            console.log(error);
        }
    } */
    prodDetail: (req,res) =>{
        let id = req.params.id;

        db.Product.findByPk(id,{
            include: [
                { association: "categories" },
                { association: "discounts" }
            ]
        }
            )
        .then(function(products) {
            res.json(products);
        })

    },
    prodCateg: (req,res) =>{
        res.send('API categorías  con total de productos')
    }
}