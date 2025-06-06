const validarDatosLineaDeRutina = require('../utils/validarDatosLineaDeRutina.js');

function validarLineaDeRutina (req, res, next) {
    const errores = validarDatosLineaDeRutina(req.body);

    if(errores.length > 0) return res.status(400).json({message: "Error de validación", errores});
    next();
}

module.exports = validarLineaDeRutina;