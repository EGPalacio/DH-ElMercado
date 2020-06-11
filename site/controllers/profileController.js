module.exports = {
    profile: (req, res) => {
        var user = req.session.usuarioLogueado
        if (user) {
            let userName = req.session.usuarioLogueado.firstName
            console.log(` ==> acceso autorizado para: ${userName}`);
        } else {
            console.log(` ==> login requerido - redireccionado para confirmar acceso`);
            res.redirect('/login')
        }
        res.render('profile', {
            title: 'profile',
            user: user
        })
    }
}