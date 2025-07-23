const validarDatosRutina = require("../utils/validarDatosRutina");

function validarRutina (req, res, next) {
    const errores = validarDatosRutina(req.body);

    if(Object.keys(errores).length > 0) 
        return res.status(400).json({message: "Error de validación", errores});

    next();
}

module.exports = validarRutina; 