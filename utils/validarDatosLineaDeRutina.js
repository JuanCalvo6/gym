function validarDatosLineaDeRutina (datos){
    const errores = {};

    
    if(!Number.isInteger(datos.series))
        errores.series = "Las series deben ser un número";

    return errores;
}

module.exports = validarDatosLineaDeRutina;