const validarDatosProfesor = require('../utils/validarDatosProfesor.js');

function validarProfesor (req, res, next) {
    const errores = validarDatosProfesor(req.body);
    
    if(Object.keys(errores).length > 0)
        return res.status(400).json({errores});

    next();
}

module.exports = validarProfesor;