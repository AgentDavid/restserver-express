const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/users');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id',
    [
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        check('rol').custom( esRolValido ),
        validarCampos
    ],
    usuariosPut
);

router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').isLength({ min: 3 }),
        check('password', 'El password debe ser de 6 o mas caracteres').isLength({ min: 6 }),
        check('correo', 'El correo no es valido').isEmail(),
        check('rol').custom( esRolValido ),
        check('correo').custom( emailExiste ),
        validarCampos
    ],
    usuariosPost
);

router.delete('/:id',
    [
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        validarCampos
    ], usuariosDelete);

module.exports = router;