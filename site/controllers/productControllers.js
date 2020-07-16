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

//Require Express Validator
var { check, validationResult, body, Result } = require("express-validator");



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
        var user = req.session.usuarioLogueado
            /*  let index = arrayProductos; */
            /*         let pdtoID = req.params.id;
                    let productFind = arrayProductos.find(pdto => pdto.id == pdtoID); */

        db.Product.findByPk(req.params.id, {
                /*  include: [{association: "Discounts"}] */
            })
            .then(function(products) {
                if (req.session.usuarioLogueado) {
                    var userType = req.session.usuarioLogueado.user_type_id
                } else {
                    var userType = 'none'
                }
                console.log(userType);
                var userLog = req.session.usuarioLogueado;
                console.log(userLog);


                res.render("detalleProductos", {
                    /* "index": index, */
                    products: products,
                    thousandGenerator: toThousand,
                    userType: userType,
                    user: user
                })
            })
    },
    todosLosProductos: (req, res) => {

        var user = req.session.usuarioLogueado
            /*   let index = arrayProductos;
              res.render('products', {
                  "index": index,
                  pdtosInSale,
                  pdtosVisited,
                  thousandGenerator: toThousand,
              }); */
        db.Product.findAll({
                /*  include: [{association: "Discounts"}, {association: "Categories"} ] */
            })
            .then(function(products) {
                res.render("products", {
                    products: products,
                    thousandGenerator: toThousand,
                    user: user
                })
            })
    },
    productos: (req, res) => {
        let index = arrayProductos;
        res.render('detalleProductos', { "index": index });
    },
    add: (req, res) => {
        var user = req.session.usuarioLogueado


        let pedidoCategorias = db.Category.findAll({
            include: [{ association: "products" }]
        });

        let pedidoDescuentos = db.Discount.findAll({
            include: [{ association: "products" }]
        });

        Promise.all([pedidoCategorias, pedidoDescuentos])
            .then(function([categorias, descuentos]) {
                res.render("addProduct", { categorias: categorias, descuentos: descuentos, user: user })
            })




    },
    store: (req, res) => {

        let errors = validationResult(req);
        if (errors.isEmpty())

        {

            req.body.price = Number(req.body.price);

            let portada

            if (req.files.imgPortada == undefined) {
                portada = '';
            } else {
                portada = req.files.imgPortada[0].filename;
                console.log(portada);

            };

            db.Product.create({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                discount_id: req.body.discount_id,
                category_id: req.body.category_id,
                image: portada,

            });
            res.redirect('/');
        } else {

            var user = req.session.usuarioLogueado


            let pedidoCategorias = db.Category.findAll({
                include: [{ association: "products" }]
            });

            let pedidoDescuentos = db.Discount.findAll({
                include: [{ association: "products" }]
            });

            Promise.all([pedidoCategorias, pedidoDescuentos])
                .then(function([categorias, descuentos]) {
                    res.render("addProduct", { errors: errors.errors, categorias: categorias, descuentos: descuentos, user: user })
                })



        }
    },
    edit: (req, res) => {
        var user = req.session.usuarioLogueado
        let prodToEdit = req.params.id;

        db.Product.findByPk(prodToEdit)
            .then((prod) => {
                db.Category.findAll()
                    .then((categ) => {
                        console.log(`  ==> selector de categorías`);
                        let categories = [];
                        for (let item of categ) {
                            categories.push(item.dataValues);
                        };
                        console.log(categories);

                        console.log(`  ==> este es el producto que vamos a editar`);
                        console.log(prod.dataValues);
                        res.render('editProduct', {
                            title: 'editProduct',
                            prod: prod.dataValues,
                            categ: categories,
                            user: user,

                        });
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    },
    editStorage: (req, res) => {

        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log('   => Tenemos errores');
            console.log(errors.errors);
            var user = req.session.usuarioLogueado
            let prodToEdit = req.params.id;

            db.Product.findByPk(prodToEdit)
                .then((prod) => {
                    db.Category.findAll()
                        .then((categ) => {
                            console.log(`  ==> selector de categorías`);
                            let categories = [];
                            for (let item of categ) {
                                categories.push(item.dataValues);
                            };
                            console.log(categories);

                            console.log(`  ==> este es el producto que vamos a editar`);
                            console.log(prod.dataValues);
                            res.render('editProduct', {
                                title: 'editProduct',
                                prod: prod.dataValues,
                                categ: categories,
                                user: user,
                                error: errors.errors,

                            });
                        });
                })
                .catch((err) => {
                    console.log(err);
                });

        } else {

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
        };
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