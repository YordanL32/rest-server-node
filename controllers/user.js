const { response ,request} = require('express')
const usuariosGet = (req= request, res = response) => {
    const {q, nombre='no name', apikey, page=1, limit} = req.query
    res.json({ msg: 'Hello World- controlador',q, nombre, apikey, page, limit  })
}
const usuariosPost = (req, res = response) => {
    const body = req.body
    res.json({ msg: 'Hello World', body })
}
const usuariosPut = (req, res = response) => {
    const id = req.params.id
    res.json({ msg: 'Hello World',id })
}
const usuariosPacth = (req, res = response) => {
    res.json({ msg: 'Hello World' })
}
const usuariosDelete = (req, res = response) => {
    res.json({ msg: 'Hello World' })
}
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPacth,
    usuariosDelete
}