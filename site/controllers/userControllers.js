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
			let usuarioALoguearse;

			for ( let user of users){
				if (user.email == req.body.email && bcrypt.compareSync(req.body.password, user.password)){
				   usuarioALoguearse = user;
				}
			}

			if (usuarioALoguearse == undefined){
				return res.render("login", {errors: [{msg: "Credenciales no válidas"}]})
			}
                 /* Acá está el session */
			req.session.usuarioLogueado = usuarioALoguearse;

			     /* Acá está la cookie */
			if (req.body.recordame != undefined){
				 res.cookie("recordame", usuarioALoguearse, {maxAge: 60000})
		  }

			res.send(req.session.usuarioLogueado) /* esto hay que cambiarlo por un redirect al home y que en vez de "login" en el header se lea el "firstName" */

		}else{
			res.render("login", {errors: errors.errors});
		}
	},
    register : (req, res) => {
        res.render('register');
    },
    store : (req, res) => {
		let errors = validationResult(req);
		if (errors.isEmpty()){
		let avatar
		if (req.files[0] == undefined ) {
			avatar ='';
		} else {
			avatar = req.files[0].filename;
		};
		
		// Do the magic
		let usuario = {
			id : newUsertId,
			...req.body,
		    password: bcrypt.hashSync(req.body.password, 10),  
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
		else{
			res.render("register", {errors: errors.errors});
		}
        
    }
};

module.exports = userControllers;