const validarDatosCliente = require('../utils/validarDatosCliente.js');

function validarCliente(req, res, next) {
    const errores = validarDatosCliente(req.body);

    if(Object.keys(errores).length > 0)
        return res.status(400).json({errores});
    
    next();
}

module.exports = validarCliente;