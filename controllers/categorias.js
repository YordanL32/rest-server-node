const { response } = require("express")
const {Categoria} = require("../models")
const obtenerCategorias = async(req, res= response)=>{
    const { limit = 5 } = req.query
    const query = { estado: true } 
    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query).populate('usuario', 'nombre').limit(Number(limit))

    ])
    res.json({ total, categorias })
}
const obtenerCategoria = async(req, res= response)=>{
const {id} = req.params
const categoria = await Categoria.findById({_id:id}).populate('usuario', 'nombre')
res.json({categoria})
}
const crearCategorias = async(req, res= response) =>{
    const nombre = req.body.nombre.toUpperCase()
    const categoriaDB = await Categoria.findOne({nombre})
    if(categoriaDB){
        return res.status(400).json({
            msg:`La categoria ${categoriaDB.nombre} ya existe`
        })
    }
    //generar la data a guardar
   // console.log(req)
    const data = {
        nombre,
        usuario:req.usuarioAuth._id
    }
    const categoria = new Categoria(data)
    //guardar en BD
    await categoria.save()
    res.status(201).json(categoria)
}
const actualizarCategorias = async(req, res= response)=>{
    const { id } = req.params
    const { _id, usuarioaAuth, ...data } = req.body 
    console.log(req)
    data.nombre = data.nombre.toUpperCase()
    data.usuario = req.usuarioAuth._id
    const categoria = await Categoria.findByIdAndUpdate(id, data,{new:true}).populate('usuario', 'nombre')
    res.json({ msg: 'Put Categoria', categoria })
}
const borrarCategorias = async(req, res= response)=>{
    const {id} = req.params
    const categoria = await Categoria.findByIdAndUpdate(id, {estado:false},{new:true}).populate('usuario', 'nombre')
    res.json(categoria)
}   
module.exports = {
    crearCategorias,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategorias,
    borrarCategorias
}