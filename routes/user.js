const { Router } = require('express')
const { usuariosGet,
        usuariosPost,
        usuariosDelete,
        usuariosPut,
        usuariosPacth } = require('../controllers/user')
const router = Router()

router.get('/', usuariosGet)
router.put('/:id', usuariosPut)
router.post('/', usuariosPost)
router.patch('/', usuariosPacth)
router.delete('/', usuariosDelete)

module.exports = router