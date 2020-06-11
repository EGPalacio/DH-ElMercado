module.exports = {
    profile: (req, res) => {
        var user = req.session.usuarioLogueado
        console.log(user);

        res.render('profile', {
            title: 'profile',
            user: user
        })
    }
}