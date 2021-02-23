const { response } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require("../helpers/google-verify");

const login = async(req, res = response) => {
    const { correo, password } = req.body;
    try {
        //Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) { 
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        //Si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            })
        }
        
        //Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token 
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error inesperado, hable con el administrador"
        });
    }
    
}

const googleSignIn = async(req, res = response) => {

    const { id_token } = req.body;
    // console.log( id_token );

    try {
        const {correo, img, nombre} = await googleVerify(id_token);

        let usuario = await Usuario.findOne({correo});
        if (!usuario) {
            // Tengo que crearlo 
            const data = {
                nombre,
                correo,
            };
            
            
            //Encriptar la contraseña
            const salt = bcryptjs.genSaltSync();
            data.password = bcryptjs.hashSync('D4V1D', salt);
            
            usuario = new Usuario(data);
            usuario.save();
        }

        //Si el usuario esta en DB
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el administrador - usuario bloqueado/eliminado'
            })
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })
    } catch (error) {
        res.status(400).json({
            msg: 'Google\'s token isn\'t valid',
            error
        })
    }

}
module.exports = {
    login,
    googleSignIn
}
