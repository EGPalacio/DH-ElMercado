// Require Sequelize
const db = require('../server/models');
const { Sequelize } = require('../server/models');
const Op = Sequelize.Op

const bcrypt = require("bcrypt");

module.exports = {
    profile: (req, res) => {
        var user = req.session.usuarioLogueado
        if (user) {
            let userName = user.first_name
            console.log(` ==> acceso autorizado para: ${userName}`);
            res.render('profileV2', {
                tag: 'profile',
                user: user
            });

        } else {
            console.log(` ==> login requerido - redireccionado para confirmar acceso`);
            res.redirect('/login')
        }

        db.User.findByPk(req.session.usuarioLogueado.id, {include : [{association : "userTypes"}]})

       
        
        .then(function(user){
            //console.log(user.userTypes.user_type);

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


        let userToEdit = req.params.id;
        let avatar;
        let password;
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
            

            db.User.update({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
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
    },

}