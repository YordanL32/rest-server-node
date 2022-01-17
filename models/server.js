const express = require('express')
const cors = require('cors')
class Server {
    constructor() {
        this.port = process.env.PORT
        this.app = express()
        //middlewares
        this.middlewares()
        //rutas de mi aplicacion
        this.router()
    }
    middlewares(){
        this.app.use(cors())
        //lectura y parseo del body
        this.app.use(express.json())
        this.app.use(express.static('public'))
    }
    router() {
        this.app.use('/api/usuarios', require('../routes/user'))
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto: ', this.port)
        })
    }
}
module.exports = Server