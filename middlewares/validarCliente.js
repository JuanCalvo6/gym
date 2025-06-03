const validarDatosCliente = require('../utils/validarDatosCliente.js');

function validarCliente(req, res, next) {
    const errores = validarDatosCliente(req.body);

    if(errores.length > 0) return res.status(400).json({message: "Errores de validación", errores})
    next();
}

module.exports = validarCliente;