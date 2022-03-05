const { Router } = require('express')
const { check } = require('express-validator')

const { usuariosGet,
        usuariosPost,
        usuariosDelete,
        usuariosPut,
        usuariosPacth } = require('../controllers/user')
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db_validators')
const { tieneRoles, validarCampos, validarJWT } = require('../middleware')

const router = Router()

router.get('/', usuariosGet)
router.put('/:id', [check('id','No es un id Valido').isMongoId(),
                   check('id').custom(existeUsuarioPorId),
                   check('rol').custom( esRolValido),
                    validarCampos], usuariosPut)

router.post('/', [
                 check('nombre', 'El nombre es obligatorio').not().isEmpty(),
                 check('password', 'El password debe ser mas de 6 caracteres ').isLength({min:6}),
                 check('correo', 'El correo no es valido').isEmail(),
                 check('correo').custom( emailExiste),
               /*  check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']), */
                 check('rol').custom( esRolValido),
                 validarCampos],
                usuariosPost)
router.patch('/', usuariosPacth)
router.delete('/:id',[  
                      validarJWT,
                    /*  validarRoles, */
                      tieneRoles('ADMIN_ROLE', 'VENTAS_ROLE'),
                      check('id','No es un id Valido').isMongoId(),
                      check('id').custom(existeUsuarioPorId),
                      validarCampos
                    ], usuariosDelete)

module.exports = router