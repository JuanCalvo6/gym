const validarDatosInscripcion = require('../utils/validarDatosInscripcion.js');

function validarInscripcion (req, res, next){
    const errores =  validarDatosInscripcion(req.body);

    if(Object.keys(errores).length > 0)
        return res.status(400).json({errores});
    
    next();
}

module.exports = validarInscripcion;