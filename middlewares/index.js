const validaCampos = require('../middlewares/validar-campos');
const validaJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');
const validarArchivoSubir = require('../middlewares/validar-archivo')

module.exports = {
    ...validarArchivoSubir,
    ...validaCampos,    
    ...validaJWT,
    ...validaRoles   
}