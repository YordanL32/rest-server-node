const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')
const fileUpload = require('express-fileupload')

class Server {
    constructor() {
        this.port = process.env.PORT
        this.app = express()
        this.paths = {
            auth      : '/api/auth',
            buscar   : '/api/buscar',
            usuario   : '/api/usuarios',
            categoria : '/api/categorias',
            producto : '/api/productos',
            uploads : '/api/uploads'
            
        }     
        //conexion a DB
        this.conectarDB()
        //middlewares
        this.middlewares()
        //rutas de mi aplicacion
        this.router()
    }
   async conectarDB(){
        await dbConnection()
    }
    middlewares(){
        this.app.use(cors())
        //lectura y parseo del body
        this.app.use(express.json())
        this.app.use(express.static('public'))
        //Fileupload carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }));
    }
    router() {
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.usuario, require('../routes/user'))
        this.app.use(this.paths.categoria, require('../routes/categorias'))
        this.app.use(this.paths.producto, require('../routes/productos'))
        this.app.use(this.paths.buscar, require('../routes/buscar'))
        this.app.use(this.paths.uploads, require('../routes/uploads'))
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto: ', this.port)
        })
    }
}
module.exports = Server