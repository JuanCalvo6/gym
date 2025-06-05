const validarDatosInscripcion = require('../utils/validarDatosInscripcion.js');

function validarInscripcion (req, res, next){
    const errores =  validarDatosInscripcion(req.body);

    if(errores.length > 0) return res.status(400).json({message: "Errores de validación", errores});
    next();
}

module.exports = validarInscripcion;