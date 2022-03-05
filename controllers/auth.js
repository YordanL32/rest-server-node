const bcryptjs = require('bcryptjs')
const { response } = require('express')
const { generarJWT } = require('../helpers/generar_jwt')
const { googleVerify } = require('../helpers/google-verify')
const Usuario = require('../models/usuario')

const login = async (req, res= response) =>{
    const {correo,password} = req.body
    try {
        //verificar si el email existe
        const usuario = await Usuario.findOne({correo})
        if(!usuario){
            return res.status(400).json({
                msg:'Usuario / password no son correctos | correo'
            })
        }
        //verificar si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg:'Usuario / password no son correctos  estado false'
            })
        }
        //verificar la contraseña
        const validPaswword = bcryptjs.compareSync(password, usuario.password)
        if(!validPaswword){
            return res.status(400).json({
                msg:'Usuario / password no son correctos  password'
            })
        }
        //Generar el JWT
        const token = await generarJWT(usuario.id)
      res.json({
        usuario,
        token
    })   
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:'hable con el administrador'
        })
    }
   
}
const googleSignIn = async (req, res= response) =>{
    const { id_token } = req.body
    try {
        const {nombre, img, correo} =  await googleVerify(id_token)
        let usuario = await Usuario.findOne({correo})
        //console.log(usuario)
        if(!usuario){
            const date = {
                nombre,
                correo,
                rol:'USER_ROLE',
                img,
                google:true,
                password:':p'
            }
            usuario = new Usuario(date)
            await usuario.save()
            
        }
        if(!usuario.estado){
            return res.status(401).json({
                msg:"Usuario Bloqueado hable con el administrador"
            })
        }
       // console.log(usuario)
        const token  = await generarJWT(usuario.id)
        res.json({
        usuario,
        token
    }) 
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:"El token no pudo verificarse"
        })
    }
   
}
module.exports = {
    login,
    googleSignIn
}