const validarDatosLogin = require("../utils/validarDatosLogin");


const validarLogin = (req, res, next) =>{
    
    const errores = validarDatosLogin(req.body, req.cookies);
    
    if(Object.keys(errores).length > 0)
        return res.status(400).json({errores});
    
    next();
}

module.exports = {
    validarLogin
};