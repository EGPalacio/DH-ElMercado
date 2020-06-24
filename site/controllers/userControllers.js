const fs = require('fs');
const path = require('path');
const bcrypt = require("bcrypt");
var { check, validationResult, body } = require("express-validator");

// Require Sequelize
const db = require('../server/models');
const { Sequelize } = require('../server/models');
const Op = Sequelize.Op

// JSON Users para eliminar ===============>
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
// JSON Users para eliminar ===============>

const newId = require('../middlewares/newId');

const newUsertId = newId.newUserId;

let userControllers = {
    login: (req, res) => {
        res.render('login');
    },
    loggedIn: (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('  ==> validación con error');
            return res.render("login", { errors: [{ msg: "Credenciales no válidas" }] })

        } else {
            var usuarioALoguearse;

            db.User.findAll({
                where: {
                    email: req.body.email
                }
            }).then((resultFindUser) => {

                usuarioALoguearse = resultFindUser[0].dataValues

                if (bcrypt.compareSync(req.body.password, usuarioALoguearse.password)) {
                    console.log('  ==> validación usuario autorizado');

                    /* Acá está el session */
                    req.session.usuarioLogueado = usuarioALoguearse;
                    console.log(` ==> confirmación de usuario logueado como: ${req.session.usuarioLogueado.first_name}`);

                    /* Acá está la cookie */
                    if (req.body.recordame != undefined) {
                        res.cookie("recordame", usuarioALoguearse, { maxAge: 60000 });
                    };

                    res.redirect('/');

                } else {
                    res.render("login", { errors: [{ msg: "Credenciales no válidas" }] })
                };

            }).catch((err) => {
                console.log(err);
            });

        };
    },
    register: (req, res) => {
        res.render('register');
    },
    store: (req, res) => {

        console.log(req.files[0]);

        let errors = validationResult(req);





        if (errors.isEmpty())

        {

            let avatar

            if (req.files[0] == undefined) {
                avatar = '';
            } else {
                avatar = req.files[0].filename;
            };

            // Do the magic
            let usuario = {
                    id: newUsertId,
                    ...req.body,
                    password: bcrypt.hashSync(req.body.password, 10),
                    password_repeat: "",
                    avatar: avatar,
                }
                //leer el json
                //let rutaJson = path.join(__dirname, '../data/accountsDataBase.json');
            let archivoUsuario = fs.readFileSync('./data/users.json', { encoding: 'utf-8' });

            let usuarios;

            if (archivoUsuario == "") {
                usuarios = [];
            } else {
                usuarios = JSON.parse(archivoUsuario);
            }

            usuarios.push(usuario);


            usuariosJSON = JSON.stringify(usuarios, null, ' ');
            fs.writeFileSync('./data/users.json', usuariosJSON);

            res.redirect('/login');

        } else {
            res.render("register", { errors: errors.errors });
        }

    },
};

module.exports = userControllers;