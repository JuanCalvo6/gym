const validarDatosProfesor = require('../utils/validarDatosProfesor.js');

function validarProfesor (req, res, next) {
    const errores = validarDatosProfesor(req.body);
    if(errores.length > 0)
        return res.status(400).json({message: "Errores de validación", errores});

    next();
}

module.exports = validarProfesor;