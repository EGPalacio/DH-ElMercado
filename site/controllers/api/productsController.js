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
            let url = 'http://' + req.headers.host;
            for (let i=0; i<product.length; i++){
                 if(product[i].categories != null){
                     if(product[i].categories.dataValues.category == "Tecnologia"){
                        tecnologia = tecnologia+1
                     }else if(product[i].categories.dataValues.category == "Electrodomesticos"){
                         electrodomesticos++
                     }
                }
                
                product[i].setDataValue("url", url + "/images/products/" + product[i].id + "/" + product[i].image);

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
    prodDetail: async (req,res) =>{

        try{
            let id = req.params.id;

            let product = await db.Product.findByPk(id,{
                include: [
                    { association: "categories" },
                    { association: "discounts" },
                ]
            });

            return res.json({
                meta: {
                    host: req.headers.host,
                    url: req.url,
                    imgPth: `${req.headers.host}/images/products/${product.id}/${product.image}`,
                },
                data: product,
            });

        } catch (error) {
            return res.status(500).json({error: true})
        }

    },
    prodCateg: async (req,res) =>{
        try{
            let categories = await db.Category.findAll({
                include: [{association: 'products'}]
            });

            let prodCount = [];
            for (const item of categories) {
                let itemCount = {
                    name: item.category,
                    countProd: item.products.length
                };
                prodCount.push(itemCount);
            }

            return res.json({
                categCount: categories.length,
                prodCount: prodCount,
                data: categories,
            });
        } catch (error) {
            return res.status(500).json({error: true})
        }
    },
}