function validarDatosRutina (datos){
    console.log(datos)
    const errores = {};

    if(!datos.nombre || datos.nombre === '')
        errores.nombre = "El nombre de la rutina es obligatorio";
    
    return errores;
}

module.exports = validarDatosRutina;