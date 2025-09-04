function validarDatosPase (datos) {
    const errores = {};

    if(!datos.nombre || datos.nombre.trim() === '')
        errores.nombre = "El nombre es obligatorio";

    if(!datos.horaInicio || datos.horaInicio.trim() == '')
        errores.horaInicio = "La hora de inicio es obligatoria";
    else if(!/^([01]\d|2[0-3]):([0-5]\d)$/.test(datos.horaInicio))
        errores.horaInicio = "La hora de inicio debe tener el formato HH:mm";

    if(!datos.horaFin || datos.horaFin.trim() == '')
        errores.horaFin = "La hora de fin es obligatoria";
    else if(!/^([01]\d|2[0-3]):([0-5]\d)$/.test(datos.horaFin))
        errores.horaFin = "La hora de fin debe tener el formato HH:mm";
    else if(datos.horaInicio && datos.horaFin && /^([01]\d|2[0-3]):([0-5]\d)$/.test(datos.horaInicio) &&
    /^([01]\d|2[0-3]):([0-5]\d)$/.test(datos.horaFin)){

        const [horaI, minutoI] = datos.horaInicio.split(":").map(Number);
        const [horaF, minutoF] = datos.horaFin.split(":").map(Number);

        if(horaI === horaF && minutoI === minutoF)
            errores.horaInicio = "Las horas de inicio y fin deben ser distintas";

        if(horaF < horaI || (horaI === horaF && minutoI > minutoF))
            errores.horaFin = "La hora de fin debe ser posterior a la de inicio";
    }

    if(!datos.precio)
        errores.precio = "El precio es obligatorio";
    else if(!Number.isInteger(datos.precio))
        errores.precio = "El precio debe ser numérico";

    return errores;
}

module.exports = validarDatosPase;