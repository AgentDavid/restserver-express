const { Router } = require('express')
const { check } = require('express-validator');
const { crearCategoria, obtenerCategoria, obtenerCategorias, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

// Obtener todas las categorias - publico
router.get('/', obtenerCategorias);

// Obtener una categoria - publico
router.get('/:id', [
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( existeCategoriaPorId ),
        validarCampos
    ], 
    obtenerCategoria
);

// Crear una categoria - privado - cualquier persona con un token valido
router.post('/', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        validarCampos
    ], 
    crearCategoria
);

// Actualizar una categoria - privado - cualquier persona con un token valido
router.put('/:id', [
        validarJWT,
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( existeCategoriaPorId ),
        check('nombre', 'El nuevo nombre es obligatorio').notEmpty(),
        validarCampos
    ],
    actualizarCategoria    
);

// Borrar una categoria - privado - cualquier persona con un token valido
router.delete('/:id',
    [
        validarJWT,
        esAdminRole,
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( existeCategoriaPorId ),
        validarCampos
    ],
    borrarCategoria
);

module.exports = router;