module.exports = function guestUserCheck(req, res, next) {
    let user = req.session.usuarioLogueado;
    if (user) {
        let userName = req.session.usuarioLogueado.firstName
        console.log(` ==> acceso autorizado para: ${userName}`);
        next();
    } else {
        console.log(` ==> login requerido - redireccionado para confirmar acceso`);
        res.redirect('/login')
    }
}