const { Router } = require('express')
const { check } = require('express-validator')
const { cargarArchivo, /* actualizarImagen, */ mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads')
const { coleccionesPermitidas } = require('../helpers')
const { validarCampos, validarArchivoSubir } = require('../middleware')

const router = Router()
router.post('/',validarArchivoSubir ,cargarArchivo)
router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id','No es un id Valido de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c , ['usuarios','productos'])),
    validarCampos
],actualizarImagenCloudinary)
router.get('/:coleccion/:id', [
    check('id','No es un id Valido de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c , ['usuarios','productos'])),
    validarCampos
], mostrarImagen)
module.exports = router