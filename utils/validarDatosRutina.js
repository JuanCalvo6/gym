function validarDatosRutina (datos){
    const errores = [];

    if(!datos.nombre )
        errores.push("El nombre de la rutina es obligatorio");

    if(!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(datos.nombre))
        errores.push("El nombre de la rutina solo debe poseer caracteres alfabéticos");

    if (!['A', 'B'].includes(datos.estado)) 
        errores.push('El estado debe ser A (activo) o B (baja).');

    return errores;
}

module.exports = validarDatosRutina;