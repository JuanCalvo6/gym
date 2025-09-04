const validarDatosPase = require('../utils/validarDatosPase.js')

function validarPase (req, res, next){
    const errores = validarDatosPase(req.body);

    if(Object.keys(errores).length > 0)
        return res.status(400).json({errores});

    next();
} 

module.exports = validarPase;