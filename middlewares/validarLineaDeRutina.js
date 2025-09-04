const validarDatosLineaDeRutina = require('../utils/validarDatosLineaDeRutina.js');

function validarLineaDeRutina (req, res, next) {
    const errores = validarDatosLineaDeRutina(req.body);

    if(Object.keys(errores).length > 0)
        return res.status(400).json({errores});
    
    next();
}

module.exports = validarLineaDeRutina;