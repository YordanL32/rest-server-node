const {Schema,  model} = require('mongoose')
const ProductoSchema = Schema({
    nombre:{
        type:String,
        required:[true, 'El nombre es requerido']
    },
    estado:{
        type:Boolean,
        default:true,
        required:true
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },
    precio:{
        type:Number,
        default:0
    },
    categoria:{
        type:Schema.Types.ObjectId,
        ref:'Categoria',
        required:true
    },
    descripcion:{ type:String },
    disponible:{type:Boolean, default:true},
    img:{type:String}
})
ProductoSchema.methods.toJSON = function(){//borrar --v, password de las respuesta
    const {__v, /* _id, */ ...data} = this.toObject()
   // data.id = _id//modifica _id a uid
    return data
}
module.exports = model('Producto',ProductoSchema)