module.exports = {
    userCheck: (req, res, next) => {
        let user = req.session.usuarioLogueado;
        if (user) {
            let userName = req.session.usuarioLogueado.first_name
            console.log(` ==> acceso autorizado para: ${userName}`);
            next();
        } else {
            console.log(` ==> login requerido - redireccionado para confirmar acceso`);
            res.redirect('/login')
        }
    },
    guestCheck: (req, res, next) => {
        let user = req.session.usuarioLogueado;
        if (user) {
            let userName = req.session.usuarioLogueado.first_name
            console.log(` ==> acceso autorizado para: ${userName}`);
            res.redirect('/profile')
        } else {
            console.log(` ==> login requerido - redireccionado para confirmar acceso`);
            next();
        }
    }
}