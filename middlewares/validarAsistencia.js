const validarDatosAsistencia = require('../utils/validarDatosAsistencia.js');

function validarAsistencia (req, res, next){
    const errores = validarDatosAsistencia(req.body);

    if(Object.keys(errores).length > 0)
        return res.status(400).json({errores});
    
    next();
}

module.exports = validarAsistencia;