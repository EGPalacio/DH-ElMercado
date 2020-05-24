const fs = require('fs');
const path = require('path');
let arrayProductos = require('../articulosJS');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


productControllers = {
    productos: (req,res) => {
        let index = arrayProductos;
        res.render('detalleProductos', {"index":index});
    },
    add:  (req,res) => {

        
        res.render('addProduct');
    },
    store: (req, res) => {
        console.log()
		req.body.price = Number(req.body.price);
		req.body.discount = Number(req.body.discount);
		let newProduct = {
			id: products[products.length - 1].id + 1,
            ...req.body,
            image : req.files,
            
			
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
        fs.writeFileSync(productsFilePath, JSON.stringify(jsonEdit))
        console.log('file saved');

        res.redirect('/');
        }
};


module.exports = productControllers;