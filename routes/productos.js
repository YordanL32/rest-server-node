const { Router } = require('express')
const { check } = require('express-validator')
const { obtenerProductos, crearProductos, obtenerProducto, actualizarProductos, borrarProductos } = require('../controllers/productos')
const { existeproductosId, existeCategoria } = require('../helpers/db_validators')
//const { existeCategoria } = require('../helpers/db_validators')
/* const { check } = require('express-validator') */
//const res = require('express/lib/response')
/* const { login, googleSignIn } = require('../controllers/auth')*/
const { validarJWT, validarCampos, validarRoles } = require('../middleware') 
const router = Router()
//obtenert todas las categorias
router.get('/', obtenerProductos)
//obtener una categoria por id
 router.get('/:id',[
    check('id','No es un id Valido de mongo').isMongoId(),
    check('id').custom(existeproductosId),
    validarCampos
] ,obtenerProducto) 
//crear categoria
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
     check('categoria','No es un id Valido de mongo').isMongoId(),
     check('categoria').custom(existeCategoria),      
    validarCampos
],crearProductos)
//actualizar categoria
 router.put('/:id',[
    validarJWT,
    check('id','No es un id Valido').isMongoId(),
    check('id').custom(existeproductosId),  
    check('categoria','No es un id Valido de mongo').isMongoId(),
    check('categoria').custom(existeCategoria),   
    validarCampos
], actualizarProductos) 
//eliminar-admin
 router.delete('/:id',[
    validarJWT,
    validarRoles,
    check('id','No es un id Valido').isMongoId(), 
    validarCampos
], borrarProductos) 
module.exports = router