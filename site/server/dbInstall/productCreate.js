const db = require('../models');

db.Product.sync({ alter: true })
    .then(console.log(`the table Products has just created!`))
    .catch(
        (err) => console.log(err)
    );