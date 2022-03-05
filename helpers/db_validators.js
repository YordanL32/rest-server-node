const { Categoria, Producto } = require('../models')
const Role = require('../models/role')
const usuario = require('../models/usuario')
const esRolValido = async (rol = '') => {
  const existsRol = await Role.findOne({ rol })
  if (!existsRol) {
    throw new Error(`El rol ${rol} no esta registrado en BD`)
  }
}
const emailExiste = async (correo = "") => {
  //verificar si el correo existe
  const existEmail = await usuario.findOne({ correo })
  if (existEmail) {
    throw new Error(`El correo: ${correo}, ya fue registrado`)
  }
}
const existeUsuarioPorId = async (id) => {
  //verificar si el id existe
  const existusuario = await usuario.findOne({ id })
  if (!existusuario) {
    throw new Error(`El id no existe: ${id}`)
  }
}
const existeCategoria = async (id) => {
  //verificar si el id existe
  console.log('id categoria:', id)
  const existCategoria = await Categoria.findOne({ _id: id })
  console.log('CATeGORIA', existCategoria)
  if (!existCategoria) {
    throw new Error(`El id no existe: ${id}`)
  }
}
const existeproductosId = async (id) => {
  //verificar si el id existe
  //console.log('id categoria:', id)
  const existProducto = await Producto.findOne({ _id: id })
  //console.log('CATeGORIA', existProducto)
  if (!existProducto) {
    throw new Error(`El id no existe: ${id}`)
  }
}
const coleccionesPermitidas = (coleccion = '', colecciones = []) =>{
  const incluida = colecciones.includes(coleccion)
  if(!incluida){
    throw new Error(`la coleccion ${coleccion} no es permitida, ${colecciones}`)
  }
  return true

}
module.exports = {
  esRolValido,
  emailExiste,
  existeUsuarioPorId,
  existeCategoria,
  existeproductosId,
  coleccionesPermitidas
}