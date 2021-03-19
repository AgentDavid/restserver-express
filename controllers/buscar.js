const { response } = require("express");
const { ObjectId } = require("mongoose").Types;

const { Usuario, Categoria, Producto } = require("../models")

const coleccionesPeritidas = [
    'usuarios',
    'categoria',
    'productos',
    'roles'
];

const buscarUsuarios = async(termino = '', res = response ) => {
    
    const esMongoID = ObjectId.isValid(termino); //

    if (esMongoID) {
        const usuario = await Usuario.findById(termino);
        if (usuario) {
            return res.json({
                usuario
            });
        } else {
            return res.json({
                msg: 'Usuario no encontrado'
            });
        }
    }

    const regex = new RegExp(termino, 'i');

    const usuarios = await Usuario.find({
        $or: [{nombre: regex}, {correo: regex}],
        $and: [{estado: true}]
    });

    return res.json({
        results: usuarios.length,
        usuarios
    });


}

const buscarCategoria = async(termino = '', res = response ) => {
    
    const esMongoID = ObjectId.isValid(termino); //

    if (esMongoID) {
        const categoria = await Categoria.findById(termino)
        .populate('usuario', 'nombre');
        if (categoria) {
            return res.json({
                categoria
            });
        } else {
            return res.json({
                msg: 'categoria no encontrada'
            });
        }
    }

    const regex = new RegExp(termino, 'i');

    const categorias = await Categoria.find(
        {estado: true, nombre: regex}
    ).populate('usuario', 'nombre');

    return res.json({
        results: categorias.length,
        categorias
    });
}


const buscarProductos = async(termino = '', res = response ) => {
    
    const esMongoID = ObjectId.isValid(termino);

    if (esMongoID) {
        const productos = await Producto.find({
                $or: [{_id: termino}, {categoria: ObjectId(termino)}],
            })
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre');
        
        if (productos) {
            return res.json({
                results: productos.length,
                productos,
            });
        } else {
            return res.json({
                msg: 'producto no encontrado'
            });
        }
    }

    const regex = new RegExp(termino, 'i');

    const productos = await Producto.find(
        {estado: true, nombre: regex}
    ).populate('usuario', 'nombre')
        .populate('categoria', 'nombre');

    return res.json({
        results: productos.length,
        productos
    });


}

const buscar = (req, res = response) => {
    const { coleccion, termino } = req.params;
    if (!coleccionesPeritidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `las colecciones peritidas son: ${coleccionesPeritidas}`
        })
    }
    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;
        case 'categoria':
            buscarCategoria(termino, res);
            break;
        case 'productos':
            buscarProductos(termino, res);
            break;
        default:
            res.status(500).json({
                msg: 'Se me olvido hacer esta busqueda'
            })
    
    } 
}

module.exports = {
    buscar
}