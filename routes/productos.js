const { Router } = require('express')
const { check } = require('express-validator');
const { obtenerProductos, crearProducto, obtenerProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');

const router = Router();

// Obtener todas los Productos - publico
router.get('/', obtenerProductos);

// Obtener una categoria - publico
router.get('/:id', [
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( existeProductoPorId ),
        validarCampos
    ], 
    obtenerProducto
);

// Crear un producto - privado - cualquier persona con un token valido
router.post('/', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        check('categoria', 'No es un ID valido').isMongoId(),
        check('categoria').custom( existeCategoriaPorId ),
        validarCampos
    ], 
    crearProducto
);

// Actualizar una categoria - privado - cualquier persona con un token valido
router.put('/:id', [
        validarJWT,
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( existeProductoPorId ),
        validarCampos
    ],
    actualizarProducto   
);

// Borrar una categoria - privado - cualquier persona con un token valido
router.delete('/:id',
    [
        validarJWT,
        esAdminRole,
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( existeProductoPorId),
        validarCampos
    ],
    borrarProducto
);

// function validarPrecio(price = 0) {
//     if (isNaN(price)) {
//         throw new Error(`${ price } no es un precio valido`)
//     } else if (price < 0 ){  
//         throw new Error(`el precio ${ price } no puede ser negativo`)
//     }
// }

module.exports = router;
