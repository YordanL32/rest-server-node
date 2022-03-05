const { Router } = require('express')
const { check } = require('express-validator')
const { crearCategorias, obtenerCategorias, obtenerCategoria, actualizarCategorias, borrarCategorias } = require('../controllers/categorias')
const { existeCategoria } = require('../helpers/db_validators')
/* const { check } = require('express-validator') */
//const res = require('express/lib/response')
/* const { login, googleSignIn } = require('../controllers/auth')*/
const { validarJWT, validarCampos, validarRoles } = require('../middleware') 
const router = Router()
//obtenert todas las categorias
router.get('/', obtenerCategorias)
//obtener una categoria por id
router.get('/:id',[
    check('id','No es un id Valido de mongo').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
] ,obtenerCategoria)
//crear categoria
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategorias)
//actualizar categoria
router.put('/:id',[
    validarJWT,
    check('id','No es un id Valido').isMongoId(),
    check('id').custom(existeCategoria),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], actualizarCategorias)
//eliminar-admin
router.delete('/:id',[
    validarJWT,
    validarRoles,
    check('id','No es un id Valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
], borrarCategorias)
module.exports = router