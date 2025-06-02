const jwt = require('jsonwebtoken');
require('dotenv').config();

const generarToken = (datos) =>{
    return new Promise((resolve,reject)=>{
        jwt.sign(
            datos,
            process.env.JWT_KEY,
            {},
            (error, token) =>{
                if(error) reject(error)
                resolve(token);
            }
        )
    })
}

module.exports = {
    generarToken
}