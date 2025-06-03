function validarDatosPase (datos) {
    const errores = [];

    if(!datos.nombre || datos.nombre.trim() === '')
        errores.push("El nombre es obligatorio");

    if(!datos.horaInicio || datos.horaInicio.trim() == '')
        errores.push("La hora de inicio es obligatoria");

    if(!/^([01]\d|2[0-3]):([0-5]\d)$/.test(datos.horaInicio))
        errores.push("La hora de inicio debe tener el formato HH:mm");

    if(!datos.horaFin || datos.horaFin.trim() == '')
        errores.push("La hora de fin es obligatoria");

    if(!/^([01]\d|2[0-3]):([0-5]\d)$/.test(datos.horaFin))
        errores.push("La hora de fin debe tener el formato HH:mm");

    if(!datos.precio)
        errores.push("El precio es obligatorio");

    if(!Number.isInteger(datos.precio))
        errores.push("El precio debe ser numérico")

    if (!['A', 'B'].includes(datos.estado)) 
        errores.push('El estado debe ser A (activo) o B (baja).');

    return errores;
}

module.exports = validarDatosPase;