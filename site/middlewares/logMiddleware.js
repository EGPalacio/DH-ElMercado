const fs = require('fs');
const path = require('path');
const bcrypt = require("bcrypt");

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

let logMiddleware = (req, res, next) => {
    let usuarioALoguearse;

    for ( let user of users){
       if (user.email == req.body.email && bcrypt.compareSync(req.body.password, user.password))
        usuarioALoguearse = user;
        req.session.usuarioLogueado = usuarioALoguearse;
         next();
     }
     

     res.redirect("/login");

 };

 module.exports = logMiddleware;