require('dotenv').config();
const jwt = require('jsonwebtoken');

const validarToken = (req, res, next) => {
    const {token} = req.cookies;

    if(!token) return res.status(401).json({message: "Sin token, no autorizado"});

    jwt.verify(token, process.env.JWT_KEY, (error, decode) =>{
        if(error) return res.status(401).json({message: "token invalido"});
        const{user, tipo} =  decode;
        req.user = {
            usuario: user,
            tipo: tipo,
        };
        next();
    })
}

module.exports = {
    validarToken,
};