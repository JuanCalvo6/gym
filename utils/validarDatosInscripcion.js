function validarDatosInscripcion(datos){
    const errores = {};

    if(!datos.idProfesor)
        errores.idProfesor = "El idProfesor es obligatorio";

    if(!datos.idPase)
        errores.idPase = "El idPase es obligatorio";

    if(!datos.diaInicio || !/^\d{4}-\d{2}-\d{2}$/.test(datos.diaInicio))
        errores.diaInicio = 'La fecha de inicio debe tener el formato YYYY-MM-DD';

    if(!datos.diaFin || !/^\d{4}-\d{2}-\d{2}$/.test(datos.diaFin))
        errores.diaFin = 'La fecha de fin debe tener el formato YYYY-MM-DD';

    if(/^\d{4}-\d{2}-\d{2}$/.test(datos.diaInicio) && /^\d{4}-\d{2}-\d{2}$/.test(datos.diaFin)){
        const fechaInicio = new Date(datos.diaInicio);
        const fechaFin =  new Date(datos.diaFin);

        if(fechaInicio >= fechaFin)
            errores.diaInicio = 'La fecha de inicio debe ser anterior a la fecha de fin';
    }

    if(!datos.precio)
        errores.precio = "El precio es obligatorio";
    else if(!/^\d{1,20}$/.test(datos.precio))
        errores.precio = "El precio solo acepta números";

    return errores;
}

module.exports = validarDatosInscripcion;