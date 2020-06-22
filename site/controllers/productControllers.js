// Require fs y Express
const fs = require('fs');
const path = require('path');
var express = require('express');
var router = express.Router();

// Require Sequelize
const db = require('../server/models');
const { Sequelize } = require('../server/models');
const Op = Sequelize.Op

//Require JSON Productos
const productJson = require('../middlewares/jsonRead')

let arrayProductos = require('../articulosJS');
const pdtosInSale = arrayProductos.filter(pdto => pdto.category == 'in-sale');
const pdtosVisited = arrayProductos.filter(pdto => pdto.category == 'visited');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsFilePath = productJson.productsFilePath
const products = productJson.products

const newId = require('../middlewares/newId');

const newProductId = newId.newProductId;

// Product Controller
module.exports = {
    detalleProductos: (req, res) => {
        let index = arrayProductos;
        let pdtoID = req.params.id;
        let productFind = arrayProductos.find(pdto => pdto.id == pdtoID);
        console.log(productFind);

        if (req.session.usuarioLogueado) {
            var userType = req.session.usuarioLogueado.category
        } else {
            var userType = 'none'
        }

        res.render('detalleProductos', {
            "index": index,
            productFind,
            thousandGenerator: toThousand,
            userType: userType

        });
    },
    todosLosProductos: (req, res) => {
        let index = arrayProductos;
        res.render('products', {
            "index": index,
            pdtosInSale,
            pdtosVisited,
            thousandGenerator: toThousand,
        });
    },
    productos: (req, res) => {
        let index = arrayProductos;
        res.render('detalleProductos', { "index": index });
    },
    add: (req, res) => {


        res.render('addProduct');
    },
    store: (req, res) => {
        let portada = req.files.imgPortada[0].filename;
        req.body.price = Number(req.body.price);
        req.body.discount = Number(req.body.discount);
        let newProduct = {
            id: newProductId,
            ...req.body,

            image: portada,



        };

        let finalProducts = [...products, newProduct];
        fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));

        console.log(req.files)
        res.redirect('/');
    },
    edit: (req, res) => {
        let prodToEdit = req.params.id;
        db.Product.findByPk(prodToEdit, {
                // include: [
                //     { association: 'discounts' },
                //     { association: 'categories' },
                // ]
            })
            .then((prod) => {
                console.log(`  ==> este es el producto que vamos a editar`);
                console.log(prod.dataValues);
                res.render('editProduct', {
                    title: 'editProduct',
                    prod: prod.dataValues,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    },
    editStorage: (req, res) => {
        let editFormData = {}
        for (item in req.body) {
            if (req.body[item] != "" && isNaN(Number(req.body[item]))) {
                editFormData[item] = req.body[item];
            } else if (req.body[item] != "") {
                editFormData[item] = Number(req.body[item]);
            };
        };
        console.log(`  ==> form`);
        console.log(editFormData);
        db.Product.update(editFormData, { where: { id: editFormData.id } })
            .then((result) => {
                console.log(`  ==> product updated`);
                console.log(editFormData.name);
                res.redirect(`/products/${editFormData.id}`);
            })
            .catch((err) => { console.log(err) });

        // router.get(`/detalleProductos/${req.params.id}`, detalleProductos);
    },
    delete: (req, res) => {
        let prodToDelete = req.body.id;
        db.Product.findByPk(prodToDelete)
            .then((prod) => {
                console.log(`  ==> este es el producto que vamos a eliminar`);
                console.log(prod.dataValues);
                db.Product.destroy({
                        where: {
                            id: prodToDelete
                        }
                    })
                    .then((result) => { console.log('  ==> Producto eliminado!') })
                    .catch((err) => { console.log(err) });
            })
            .catch((err) => { console.log(err) });

        res.redirect('/');
    }
};