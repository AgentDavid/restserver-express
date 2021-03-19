const { Categoria, Usuario, Producto } = require('../models');
const role = require('../models/role');

// Verificar si el rol existe
const esRolValido = async(rol = '') => {
    const existeRol = await role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${ rol } no esta registrado en la DB`)
    }
}

//Verificar si el correo existe
const emailExiste = async(correo) => {
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail) {
        throw new Error(`El correo ${ correo } ya existe`)
    }
}

//Verificar si el usuario existe
const existeUsuarioPorId = async(id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El Usuario con ID ${ id } no existe`)
    }
}

//Verificar si una categoria existe
const existeCategoriaPorId = async(id) => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`La categoria con ID ${ id } no existe`)
    }
}

//Verificar si una categoria existe
const existeProductoPorId = async(id) => {
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`El Producto con ID ${ id } no existe`)
    }
}


module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}