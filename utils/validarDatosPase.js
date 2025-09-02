function validarDatosPase (datos) {
    const errores = [];
    console.log(datos);

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

    if(datos.horaInicio && datos.horaFin &&
    /^([01]\d|2[0-3]):([0-5]\d)$/.test(datos.horaInicio) &&
    /^([01]\d|2[0-3]):([0-5]\d)$/.test(datos.horaFin)){

        const [horaI, minutoI] = datos.horaInicio.split(":").map(Number);
        const [horaF, minutoF] = datos.horaFin.split(":").map(Number);

        if(horaI === horaF && minutoI === minutoF)
            errores.push("Las horas de inicio y fin deben ser distintas");

        if(horaF < horaI || (horaI === horaF && minutoI > minutoF))
            errores.push("La hora de fin debe ser posterior a la de inicio");
    }

    if(!datos.precio)
        errores.push("El precio es obligatorio");

    if(!Number.isInteger(datos.precio))
        errores.push("El precio debe ser numérico")

    return errores;
}

module.exports = validarDatosPase;