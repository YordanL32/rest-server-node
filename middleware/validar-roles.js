const { response, request } = require("express")

const validarRoles = (req= request, res= response, next) =>{

    if(!req.usuarioAuth){
        return res.status(500).json({
            msg:"Se requiere verificar el rol sin validar el token primero"
        })
    }
    const {rol, nombre} = req.usuarioAuth
    if(rol !=='ADMIN_ROLE'){
        return res.status(401).json({
            msg:`${nombre} no es administrador - no puede hacer esto`
        })
    }
    next()
}
const tieneRoles = (...roles) =>{

    return (req= request, res= response, next) => {
        if(!req.usuarioAuth){
            return res.status(500).json({
                msg:"Se requiere verificar el rol sin validar el token primero"
            })
        }
        if(!roles.includes(req.usuarioAuth.rol) ){
            return res.status(500).json({
                msg:`El servicio requiere uno de estos roles: ${roles}`
            })
        }
        console.log(roles)
        next()
    }

    
}
module.exports = {
    validarRoles,
    tieneRoles
}