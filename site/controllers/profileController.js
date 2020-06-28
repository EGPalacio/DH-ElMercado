module.exports = {
    profile: (req, res) => {
        var user = req.session.usuarioLogueado
        if (user) {
            let userName = user.first_name
            console.log(` ==> acceso autorizado para: ${userName}`);
            res.render('profile', {
                tag: 'profile',
                user: user
            });

        } else {
            console.log(` ==> login requerido - redireccionado para confirmar acceso`);
            res.redirect('/login')
        }

    }
}