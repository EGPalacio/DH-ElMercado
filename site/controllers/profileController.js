// Require Sequelize
const db = require('../server/models');
const { Sequelize } = require('../server/models');
const Op = Sequelize.Op

const bcrypt = require("bcrypt");
var { check, validationResult, body, Result } = require("express-validator");

module.exports =  {
    profile: (req, res) => {
        var users = req.session.usuarioLogueado
        if (users) {
            let userName = req.session.usuarioLogueado.first_name
            console.log(` ==> acceso autorizado para: ${userName}`);
        } else {
            console.log(` ==> login requerido - redireccionado para confirmar acceso`);
            res.redirect('/login')
        }

        db.User.findByPk(req.session.usuarioLogueado.id, {include : [{association : "userTypes"}]})

       
        
        .then(function(user){
          

        res.render('profileV2', {
            title: 'Perfil',
            user: user
        })
    })
    },
    edit: (req, res) => {
        let pedidoUser = db.User.findByPk(req.params.id);
 
        let pedidoRoles = db.UserTypes.findAll();
 
        Promise.all([pedidoUser, pedidoRoles])
             .then(function([user, roles]){
                 res.render("editProfile", {title: 'Perfil',user: user, roles : roles} )
             })
     },
     save: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()) {

           let userToEdit = req.params.id;
           let avatar;
           let password;
           let first_name;
           let last_name;
           let email;

           db.User.findByPk(userToEdit)
             .then((user) => {
                console.log(`  ==> este es el user que vamos a editar`);
                console.log(user.avatar);

          if (req.body.password === '') {
             password = user.password;
          } else {
            password = bcrypt.hashSync(req.body.password, 10);
          };
          if (req.files[0] == undefined) {
             avatar = user.avatar;
          } else {
            avatar = req.files[0].filename;
          };
          if (req.body.first_name === "") {
             first_name = user.first_name;
          } else {
             first_name = req.body.first_name;
          };
          if (req.body.last_name === "") {
             last_name = user.last_name;
         } else {
             last_name = req.body.last_name;
         };
         if (req.body.email === "") {
             email = user.email;
         } else {
             email = req.body.email;
         };

            db.User.update({
                first_name: first_name,
                last_name: last_name,
                email: email,
                user_type_id : req.body.user_type_id,
                password : password,
                updatedAt: Date.now(),
                avatar : avatar,
            }, {
                where : {
                    id : req.params.id
                }
            });

          res.redirect("/profile/");
         })
        }else{
            let pedidoUser = db.User.findByPk(req.params.id);
            let pedidoRoles = db.UserTypes.findAll();
         Promise.all([pedidoUser, pedidoRoles])
             .then(function([user, roles]){
                 res.render("editProfile", {title: 'Perfil',user: user, roles : roles, errors: errors.errors} )
             })
        }
    },
}