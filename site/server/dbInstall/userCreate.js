// Requires Json read
const fs = require('fs');
const path = require('path');
const users = require('../../middlewares/jsonRead');

// Requires Sequelize Models
const db = require('../models');


let userTypeToCreate = [{
    id: 1,
    user_type: 'Admin'
},
{
    id: 2,
    user_type: 'Empresa'
},
{
    id: 3,
    user_type: 'Individuo'
},
];

console.log(userTypeToCreate);

// Alter table USER TYPE- adjustments to existing model
db.UserTypes.sync({ alter: true })
    .then((userTypeTable) => {
        console.log(`    => the table User Type has just created!`);

        // USER TYPE DB upload
        db.UserTypes.bulkCreate(userTypeToCreate)
            .then((result) => {
                console.log('    => Roles de Usuarios creados en DB')
            })
            .catch((err) => { console.log(err) });
    })
    .catch((err) => { console.log(err) });


    // Array construction for DB upload in bulk create
let userToCreate = [];
users.users.forEach(user => {
    userToCreate.push({
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        password: user.password,
        user_type_id: user.category,
        avatar: user.avatar,
    })
});
console.log(userToCreate);

// Alter table - adjustments to existing model
db.User.sync({ alter: true })
    .then((userTable) => {
        console.log(`the table User has just created!`);

        // Product DB upload
        db.User.bulkCreate(userToCreate)
            .then((result) => {
                console.log('Usuarios creados en DB')
            })
            .catch((err) => { console.log(err) });
    })
    .catch((err) => { console.log(err) });