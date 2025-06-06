function validarDatosLineaDeRutina (datos){
    const errores = [];

    if(!Number.isInteger(datos.series))
        errores.push("Las series deben ser un número");

    if(!Number.isInteger(datos.descanso))
        errores.push("El tiempo de descanso deben ser un número");

    return errores;
}

module.exports = validarDatosLineaDeRutina;