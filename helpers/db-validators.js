const role = require('../models/role');
const Usuario = require('../models/usuario')

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


module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}