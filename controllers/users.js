const { response, request } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario')

const usuariosGet = async(req = request, res = response) => {
    
    const { limit = 50, from = 0 } = req.query;
    const query = { estado: true };

    // const usuarios = await Usuario.find(query)
    //     .skip(Number(from))
    //     .limit(Number(limit));
    
    // const total = await Usuario.countDocuments(query);

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(from))
        .limit(Number(limit))
    ])

    res.json({
        total,
        usuarios
    })
};

const usuariosPost = async (req, res) => {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    //Guardar en la BD
    await usuario.save();

    res.json({
        'request': 'POST REQUEST',
        'ok': true,
        usuario
    })

}

const usuariosPut = async (req, res) => {
    const { id } = req.params;
    const { _id, password, google, ...resto } = req.body

    //TODO Validar contra la base de datos
    if (password) {
        //Encriptar la contraseña
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario)
}

const usuariosDelete = async(req, res) => {
    const { id } = req.params;

    //Borrado por referencia
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json({
        usuario
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}