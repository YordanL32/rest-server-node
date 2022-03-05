const  validarCampos      = require('../middleware/validar-campos')
const  validarJWT         = require('../middleware/validar-jwt')
const  tieneRoles         = require('../middleware/validar-roles')
const  validarArchivos    = require('../middleware/validar-archivo')

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...tieneRoles,
    ...validarArchivos
}