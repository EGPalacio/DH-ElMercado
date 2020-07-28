const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
var { check, validationResult, body, Result } = require("express-validator");

var upload = require("../middlewares/helperMulter");

// Require Sequelize
const db = require("../server/models");
const { Sequelize } = require("../server/models");
const { errors } = require("../middlewares/helperMulter");
const Op = Sequelize.Op;

let userControllers = {
  emailValidation: (req, res, next) =>   {
    value = req.params.email;

    db.User.findOne({where : {email : value }})
    .then(user => {
     if (user) {
        res.json({
            esvalido: false,
        });
      } else {
        res.json({
            esvalido: true,
        });
      }
      });
  },
  login: (req, res) => {
    res.render("login");
  },
  loggedIn: (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("  ==> validación con error");
      return res.render("login", {
        errors: [{ msg: "Credenciales no válidas" }],
      });
    } else {
      var usuarioALoguearse;

      db.User.findAll({
        where: { email: req.body.email },
        include: [{ association: "userTypes" }],
      })
        .then((resultFindUser) => {
          usuarioALoguearse = resultFindUser[0].dataValues;

          if (
            bcrypt.compareSync(req.body.password, usuarioALoguearse.password)
          ) {
            console.log("  ==> validación usuario autorizado");

            /* Acá está el session */
            req.session.usuarioLogueado = usuarioALoguearse;
            console.log(
              ` ==> confirmación de usuario logueado como: ${req.session.usuarioLogueado.first_name}`
            );

            /* Acá está la cookie */
            if (req.body.recordame != undefined) {
              res.cookie("recordame", usuarioALoguearse, { maxAge: 60000 });
            }

            res.redirect("/");
          } else {
            res.render("login", {
              errors: [{ msg: "Credenciales no válidas" }],
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  register: (req, res) => {
    //let pedidoUser = db.User.findAll();

    let pedidoUser = db.User.findAll();

    let pedidoRoles = db.UserTypes.findAll();

    Promise.all([pedidoUser, pedidoRoles]).then(function ([user, roles]) {
      res.render("register", { user: user, roles: roles });
    });
  },
  store: (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      let avatar;

      if (req.files[0] == undefined) {
        avatar = "";
      } else {
        avatar = req.files[0].filename;
      }

      // Do the magic

      db.User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        user_type_id: req.body.user_type_id,
        
        avatar: avatar,
      });

      res.redirect("/login");
    } else {
      let pedidoUser = db.User.findByPk(req.params.id);

      let pedidoRoles = db.UserTypes.findAll();

      Promise.all([pedidoUser, pedidoRoles]).then(function ([user, roles]) {
        res.render("register", {
          errors: errors.errors,
          user: user,
          roles: roles,
        });
      });
    }
  },
};

module.exports = userControllers;
