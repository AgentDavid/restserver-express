const { response } = require("express");
const  { Categoria } = require('../models');

// obtenerCategorias - paginado - total - populate
const obtenerCategorias = async(req, res = response) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { estado: true };

    const [ total, categorias ] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .populate('usuario', 'nombre')
        .skip(Number(from))
        .limit(Number(limit))
    ])

    res.json({
        total,
        categorias
    })
}

// obtenerCategoria - populate {}
const obtenerCategoria = async(req, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');
    res.json({categoria});
}


const crearCategoria = async(req, res = response) => {
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({nombre});

    if(categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`
        })
    }

    //Generar la data y guardarla
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria( data );
    await categoria.save();
    res.status(201).json({ categoria })
}

// actualizarCategoria
const actualizarCategoria = async(req, res = response) => {
    const { id } = req.params;
    const nombre = req.body.nombre.toUpperCase();

    const categoria = await Categoria.findByIdAndUpdate(id, {nombre, usuario: req.usuario._id});

    res.json({ categoria });
    
}

// borrarCategoria - estado False
const borrarCategoria = async(req, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id, {estado: false ,usuario: req.usuario._id});

    res.json({ categoria });
}


module.exports = {
    crearCategoria,
    obtenerCategoria,
    obtenerCategorias,
    actualizarCategoria,
    borrarCategoria
}