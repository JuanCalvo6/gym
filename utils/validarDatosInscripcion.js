function validarDatosInscripcion(datos){
    const errores = [];

    if(!datos.idProfesor)
        errores.push("El idProfesor es obligatorio");

    if(!datos.idPase)
        errores.push("El idPase es obligatorio");

    if(!datos.diaInicio || !/^\d{4}-\d{2}-\d{2}$/.test(datos.diaInicio))
        errores.push('La fecha de inicio debe tener el formato YYYY-MM-DD');

    if(!datos.diaFin || !/^\d{4}-\d{2}-\d{2}$/.test(datos.diaFin))
        errores.push('La fecha de fin debe tener el formato YYYY-MM-DD');

    if(/^\d{4}-\d{2}-\d{2}$/.test(datos.diaInicio) && /^\d{4}-\d{2}-\d{2}$/.test(datos.diaFin)){
        const fechaInicio = new Date(datos.diaInicio);
        const fechaFin =  new Date(datos.diaFin);

        if(fechaInicio >= fechaFin)
            errores.push('La fecha de inicio debe ser anterior a la fecha de fin');
    }

    if(!datos.precio)
        errores.push("El precio es obligatorio");

    if(!/^\d{1,20}$/.test(datos.precio))
        errores.push("El precio solo acepta números");

    if (!['A', 'B'].includes(datos.estado)) 
        errores.push('El estado debe ser A (activo) o B (baja).');

    return errores;
}

module.exports = validarDatosInscripcion;