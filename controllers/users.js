const { response } = require('express')
const { request } = require('express')

const usuariosGet = (req = request, res = response) => {
    const { q, nombre = "No name", apikey } = req.query;

    res.json({
        'ok': true,
        'msg': "get API controller",
        q,
        nombre,
        apikey
    }) 
};

const usuariosPost = (req, res) => { 
    const {nombre, edad} = req.body;
    const { id } = req.params;

    res.json({
        'request': 'POST REQUEST',
        'ok': true,
        'nombre' : nombre,
        'edad' : edad,
        'id': id
    })

}

const usuariosPut = (req, res) => { 
    const {nombre, edad} = req.body;
    const { id } = req.params;

    res.json({
        'request': 'PUT REQUEST',
        'ok': true,
        'nombre' : nombre,
        'edad' : edad,
        id
    })
}

const usuariosDelete = (req, res) => { 
    res.json({
        'ok': true,
        'msg': "delete API"
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}