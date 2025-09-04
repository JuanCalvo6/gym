function validarDatosAsistencia (datos){
    const errores = {};

    if (!datos || typeof datos.fecha !== "string"){
        errores.fecha ="No se proporcionó una fecha válida.";
    }else if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(datos.fecha)){
        errores.fecha = 'Formato de fecha inválido. Debe ser HH:mm DD-MM-YYYY';
    }
        
    return errores;
}

module.exports = validarDatosAsistencia;