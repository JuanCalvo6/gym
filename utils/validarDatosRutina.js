function validarDatosRutina (datos){
    console.log(datos)
    const errores = {};

    if(!datos.nombre || datos.nombre === ''){
        errores.nombre = "El nombre de la rutina es obligatorio";
        return errores;
    }
        
    if(!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(datos.nombre))
        errores.nombre ="El nombre de la rutina solo debe poseer caracteres alfabéticos";
    
    return errores;
}

module.exports = validarDatosRutina;