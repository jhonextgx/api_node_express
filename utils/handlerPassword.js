const bcryptjs = require("bcryptjs");

/**
 * contrasena sin encriptar
 * @param {*} passwordPlain
 */
const encrypt = async (passwordPlain) =>{
    const hash = await bcryptjs.hash(passwordPlain, 10);
    //TODO: 
    return hash;

}

/**
 * contrasena sin encriptar y encriptada
 * @param {*} passwordPlain
 * @param {*} hashPassword
 */

const compare = async (passwordPlain, hashPassword) =>{
    return await bcryptjs.compare(passwordPlain, hashPassword);    
}

module.exports = { encrypt, compare};