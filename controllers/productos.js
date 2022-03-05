const { response } = require("express")
const { Producto} = require("../models")
const obtenerProductos = async(req, res= response)=>{
    const { limit = 5, desde=0 } = req.query
    const query = { estado: true } 
    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
        .skip(Number(desde))
        .limit(Number(limit))

    ])
    res.json({ total, productos })
}
const obtenerProducto = async(req, res= response)=>{
const {id} = req.params
const producto = await Producto.findById({_id:id})
.populate('usuario', 'nombre')
.populate('categoria', 'nombre')
res.json({producto})
}
const crearProductos = async(req, res= response) =>{
    const {usuario,...body} = req.body
    const nombre = req.body.nombre
    const productoDB = await Producto.findOne({nombre})    
    if(productoDB){
        return res.status(400).json({
            msg:`El producto ${productoDB.nombre} ya existe con ese nombre`
        })
    }
    //generar la data a guardar
   // console.log(req)
    const data = {
        ...body,
        nombre:nombre.toUpperCase(),        
        usuario:req.usuarioAuth._id
    }
    const newProducto = new Producto(data)
    //guardar en BD
    await newProducto.save()
    res.status(201).json(newProducto)
}
const actualizarProductos = async(req, res= response)=>{
    const { id } = req.params
    const { _id, usuarioaAuth, ...data } = req.body  
    data.nombre = data.nombre.toUpperCase()
    data.usuario = req.usuarioAuth._id
    const producto = await Producto.findByIdAndUpdate(id, data,{new:true})
    .populate('usuario', 'nombre')
    .populate('categoria', 'nombre')
    res.json({ msg: 'Put Producto', producto })
}
const borrarProductos = async(req, res= response)=>{
    const {id} = req.params
    const producto = await Producto.findByIdAndUpdate(id, {estado:false},{new:true})
    .populate('usuario', 'nombre')
    .populate('categoria', 'nombre')
    res.json({msg:'Producto eliminado',producto})
}   
module.exports = {
    crearProductos,
    obtenerProductos,
    obtenerProducto,
    actualizarProductos,
    borrarProductos 
}