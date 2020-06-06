const fs = require('fs');
const path = require('path');
const bcrypt = require("bcrypt"); /* Después borrar lo agregué para probar mi parte del código */
var {check, validationResult, body} = require("express-validator");

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
//const bcrypt = require('bcrypt');
//const upload = require('../misFunciones/helpMulter');


const newId = require('../middlewares/newId');

const newUsertId = newId.newUserId;

//const productsFilePath = path.join(__dirname, '../data/accountsDataBase.json');
//const accounts = JSON.parse(fs.readFileSync(accountsFilePath, 'utf-8'));

let userControllers = {
    login: (req,res) => {
        res.render('login');
	},

	loggedIn: (req,res) => {
		let errors = validationResult(req);
		if (errors.isEmpty()){
			res.send("TODO OK")
		}else{
			res.render("login", {errors: errors.errors});
		}
		
		
		

	},

    register : (req, res) => {
        res.render('register');
    },
    store : (req, res) => {
		let avatar = req.files[0].filename;
		// Do the magic
		let usuario = {
			id : newUsertId,
			...req.body,
		    password: bcrypt.hashSync(req.body.password, 10),    /* Después borrar lo agregué para probar mi parte del código */
			avatar : avatar,
		}
		//leer el json
		//let rutaJson = path.join(__dirname, '../data/accountsDataBase.json');
		let archivoUsuario = fs.readFileSync('./data/users.json', {encoding: 'utf-8'});

		let usuarios;

		if(archivoUsuario == "") {
			usuarios = [ ];
		} else {
			usuarios = JSON.parse(archivoUsuario);
		}
		
		usuarios.push(usuario);


		usuariosJSON = JSON.stringify(usuarios, null, ' ');
		fs.writeFileSync('./data/users.json', usuariosJSON);

		res.redirect('/login');


        
    }
};

module.exports = userControllers;