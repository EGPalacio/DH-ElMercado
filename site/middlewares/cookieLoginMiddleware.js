const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));


function cookieLoginMiddleware (req, res, next){

    if (req.cookies.recordame != undefined && req.session.usuarioLogueado == undefined){
        req.session.usuarioLogueado = req.cookies.recordame;
    }
    next();
}


module.exports = cookieLoginMiddleware;