const validarDatosPase = require('../utils/validarDatosPase.js')

function validarPase (req, res, next){
    const errores = validarDatosPase(req.body);

    if(errores.length > 0)
        return res.status(400).json({message: "Errores de validación", errores})

    next();
} 

module.exports = validarPase;