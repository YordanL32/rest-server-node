const { request, response } = require("express")
const jwt = require('jsonwebtoken')
const Usuario = require("../models/usuario")
const validarJWT = async (req= request, res = response, next) =>{
    const token = req.header('x-token')
    if(!token){
        return res.status(401).json({
            msg:"No hay token en la petición"
        })
    }
    try {
     const {uid} = jwt.verify(token, process.env.SECRETPRIVATEKEY)
     //leer usuario que corresponde al uid
        const usuarioAuth = await Usuario.findById(uid)
        if(!usuarioAuth){
            return res.status(401).json({
                msg:"token no valido | usuario no existe en BD"
            })
        }
        //verificar si uid tiene estado false
        if(!usuarioAuth.estado){
            return res.status(401).json({
                msg:"Token invalido | usuario con estado en: false"
            })
        }
        req.usuarioAuth = usuarioAuth
     req.uid = uid
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            msg:"Token no valido"
        })
    }
    //console.log(token)
   // next()
}

module.exports = {
    validarJWT
}