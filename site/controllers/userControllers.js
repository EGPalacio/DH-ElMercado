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

            db.User.findAll( {
                where: {
                    email: req.body.email
                }
            })
                
                .then((resultFindUser) => {

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

            db.User.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10),
                user_type_id:req.body.user_type_id,
                createdAt: Date.now(),
                avatar : avatar
                
            });

            res.redirect('/login');

        } else {
            res.render("register", { errors: errors.errors });
        }

    },
};

module.exports = userControllers;