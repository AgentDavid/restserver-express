const { response } = require("express");
const { Producto, Categoria } = require("../models");

// obtenerProductos - paginado - total - populate
const obtenerProductos = async(req, res = response) => {
    const { limit = 5, from = 0 } = req.query;
    const query = { estado: true };

    const [ total, productos ] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
        .skip(Number(from))
        .limit(Number(limit))
    ])

    res.json({
        total,
        productos
    })
}

// obtenerProducto - populate {}
const obtenerProducto = async(req, res = response) => {
    const { id } = req.params;
    const producto = await Producto.findById(id).populate('usuario', 'nombre');
    res.json({producto});
}

const crearProducto = async(req, res = response) => {
    const {estado, usuario, ...body } = req.body;
    const productoId = await Producto.findOne({ nombre: body.nombre.toUpperCase() });
    
    if(productoId) {
        return res.status(400).json({
            msg: `El producto ${productoId.nombre} ya existe`
        })
    }

    //Generar la data y guardarla
    const data = {
        ...body,
        nombre: req.body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = new Producto( data );
    await producto.save();
    res.status(201).json({ producto })
}

// actualizarProducto
const actualizarProducto = async(req, res = response) => {
    const { id } = req.params;
    const {estado, usuario, ...data } = req.body;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;
    
    const producto = await Producto.findByIdAndUpdate(id, data, {new: true});

    res.json({ producto });
    
}


// borrarProducto - estado False
const borrarProducto = async(req, res = response) => {
    const { id } = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate(id, {estado: false , usuario: req.usuario._id});

    res.json({ productoBorrado });
}



module.exports = {
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    crearProducto,
    borrarProducto
}