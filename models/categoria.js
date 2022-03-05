const {Schema,  model} = require('mongoose')
const CategoriaSchema = Schema({
    nombre:{
        type:String,
        required:[true, 'El nombre es requerido'],
        unique:true
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
    }
})
CategoriaSchema.methods.toJSON = function(){//borrar --v, password de las respuesta
    const {__v, /* _id, */ ...data} = this.toObject()
   // data.id = _id//modifica _id a uid
    return data
}
module.exports = model('Categoria',CategoriaSchema)