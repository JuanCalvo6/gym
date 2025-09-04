function validarDatosLineaDeRutina (datos){
    const errores = [];
    console.log(datos);
    if(!Number.isInteger(datos.series))
        errores.push("Las series deben ser un número");

    return errores;
}

module.exports = validarDatosLineaDeRutina;