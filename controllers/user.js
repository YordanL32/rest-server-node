const { response, request } = require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs')

const usuariosGet = async (req = request, res = response) => {
    const { limit = 5 } = req.query
    const query = { estado: true }
    /*  const usuarios = await Usuario.find(query)
     .limit(Number(limit))
     const total = await Usuario.countDocuments(query) */
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query).limit(Number(limit))

    ])
    res.json({ total, usuarios })
}
const usuariosPost = async (req, res = response) => {
    const { nombre, correo, password, rol } = req.body
    const usuario = new Usuario({ nombre, correo, password, rol })
    //encrytar la contraseña
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt)
    //Guardar en BD
    await usuario.save()
    res.json({ usuario })
}
const usuariosPut = async (req, res = response) => {
    const { id } = req.params
    const { _id, password, google, correo, ...resto } = req.body
    if (password) {
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(password, salt)
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto)
    res.json({ msg: 'Put Usuario', usuario })
}
const usuariosPacth = (req, res = response) => {
    res.json({ msg: 'Hello World' })
}
const usuariosDelete = async (req, res = response) => {
    const { id } = req.params
    //const usuario = await Usuario.findByIdAndDelete(id) eliminacion fisica
    //const uid = req.uid
    const usuarioAuth = req.usuarioAuth
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false }, {new:true})
    res.json({ usuario , usuarioAuth})
}
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPacth,
    usuariosDelete
}