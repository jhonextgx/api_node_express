const express = require("express");
const fs = require("fs");
const router = express.Router();

const PATH_ROUTES = __dirname;

const removeExtencion = (filename) => {

    return filename.split('.').shift();
}


fs.readdirSync(PATH_ROUTES).filter((file) => {
    const name = removeExtencion(file) //TODO users, trackc, storage
    if(name!=='index'){
        console.log(`Cargando rutas ${name}`)
        router.use(`/${name}`, require(`./${file}`)) //TODO localhost:3000/api/
    }
})

module.exports = router