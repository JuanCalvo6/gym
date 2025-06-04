const validarDatosAsistencia = require('../utils/validarDatosAsistencia.js');

function validarAsistencia (req, res, next){
    const errores = validarDatosAsistencia(req.body);

    if(errores.length > 0) return res.status(400).json({message: "Error de validación", errores});
    next();
}

module.exports = validarAsistencia;