const fs = require('fs');
const path = require('path');
var express = require('express');
var router = express.Router();
let arrayProductos = require('../articulosJS');
const pdtosInSale = arrayProductos.filter(pdto => pdto.category == 'in-sale');
const pdtosVisited = arrayProductos.filter(pdto => pdto.category == 'visited');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const newId = require('../middlewares/newId');

const newProductId = newId.newProductId;


productControllers = {
    detalleProductos: (req,res) => {
        let index = arrayProductos;
        let pdtoID = req.params.id;
        let productFind = arrayProductos.find(pdto => pdto.id == pdtoID);
        console.log(productFind);
        

        res.render('detalleProductos', {
            "index":index,
            productFind,
			thousandGenerator: toThousand
        });
    },
    todosLosProductos: (req,res) => {
        let index = arrayProductos;
        res.render('products',{
            "index":index,
            pdtosInSale,
            pdtosVisited,
            thousandGenerator: toThousand,
        });
    },
    productos: (req,res) => {
        let index = arrayProductos;
        res.render('detalleProductos', {"index":index});
    },
    add:  (req,res) => {

        
        res.render('addProduct');
    },
    store: (req, res) => {
        let portada = req.files.imgPortada[0].filename;
		req.body.price = Number(req.body.price);
		req.body.discount = Number(req.body.discount);
		let newProduct = {
			id: newProductId,
            ...req.body,
            
            image : portada,
            
            
			
        };
        
		let finalProducts = [...products, newProduct];
        fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));
        
        console.log(req.files)
        res.redirect('/');
    },
    edit: (req,res) =>{
        let prodToEdit = req.params.id;
        products.forEach(item => {
            if(item.id == prodToEdit){
                prodToEdit = item;
            };
        });
        res.render('editProduct', {
            title: 'editProduct',
            prod: prodToEdit,
        });
    },
    editStorage: (req,res) => {
        let editFormData = {}
        for (item in req.body) {
            if(req.body[item] != "" && isNaN(Number(req.body[item])) ){
                editFormData[item] = req.body[item];
            } else if(req.body[item] != "" ) {
                editFormData[item] = Number(req.body[item]);
            };
        };
        console.log(`form`);
        console.log(editFormData);

        let prodToEdit = req.params.id;
        let prodEditArr = [];
        products.forEach(item => {
            if(item.id == prodToEdit){
                console.log(`to edit`);
                console.log(item);
                prodEdit = {...item, ...editFormData};
                prodEditArr.push(prodEdit)
                console.log(`result`);
                console.log(prodEdit);
            }
        });

        let jsonEdit = products.map(obj => prodEditArr.find(o => o.id === obj.id) || obj);
        console.log(jsonEdit);
        fs.writeFileSync(productsFilePath, JSON.stringify(jsonEdit, null, '\t'));
        console.log('file saved');

        res.redirect(`/products/${req.params.id}`);
        // router.get(`/detalleProductos/${req.params.id}`, detalleProductos);
        },
    delete: (req,res) =>{
        let prodToDelete = req.body.id;

        products.forEach(item => {
            if(item.id == prodToDelete){
                prodToDelete = item;
                console.log(`Objeto a eliminar: `);
                console.log(prodToDelete);
            };
        });

        let prodToDelIndex = products.indexOf(prodToDelete);

        let prodUpdated = products.splice(prodToDelIndex, 1)
        console.log(`eliminado: `);
        console.log(prodUpdated);
        console.log(`resultado a guardar: `);
        console.log(products);
        
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, '\t'));
        console.log('file saved');

        res.redirect('/');
    }
};

module.exports = productControllers;