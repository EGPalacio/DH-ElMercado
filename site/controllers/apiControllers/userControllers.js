const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
var { check, validationResult, body, Result } = require("express-validator");

var upload = require("../../middlewares/helperMulter");

// Require Sequelize
const { User, Sequelize  } = require("../../server/models");
const Op = Sequelize.Op;

let userControllers = {
    listAll: async (req, res, next) =>   {
       try {
            const users = await User.findAll();
            if(!users) {
                return res.status(404).json({msg: 'No se encontró el usuario'})
            }
            return res.json({users});
        
        } catch (error) {
            return res.status(500).json({error: true})
        }

        
       
    },
    findOne : async (req, res, next) =>   {
        let id= req.params.id;
        let url = 'http://' + req.headers.host;
        
        try {
            const user = await User.findByPk(id,
                {include: [{ association: "userTypes" }]}
                );
            if(!user) {
                return res.status(404).json({msg: 'No se encontró el usuario'})
            }
            return res.json({
                  
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                user_type_id: user.userTypes.user_type,
                avatar: url + "/images/users/" + user.id + "/" + user.avatar ,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                });
            
        } catch (error) {
            return res.status(500).json({error: true})
            
        }
        
       
          
          
      },
      destroyOne : async (req, res, next) =>   {
        let id= req.params.id;
                
        try {
            const user = await User.destroy({
                    where: {
                        id: id
                    }
                })
               
            if(!user) {
                return res.status(404).json({msg: 'No se encontró el usuario'})
            }
            return res.status(200).json({msg: 'usuario eliminado'});
            
        } catch (error) {
            return res.status(500).json({error: true})
        }
            
      },
      createOne : (req, res ) => {
          
            User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            user_type_id: req.body.user_type_id,
           
          });
          return res.status(200).json({msg: 'usuario creado'});

      },
      updateOne : (req, res) => {

        try {
            User.update({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                user_type_id : req.body.user_type_id,
                password : bcrypt.hashSync(req.body.password, 10),
                avatar : req.body.avatar,
            }, {
                where : {
                    id : req.params.id
                }
            });
    
            return res.status(200).json({msg: 'usuario actualizado'});
        } catch (error) {
            return res.status(500).json({error: true})
        }
        
      }

    
}

module.exports = userControllers;