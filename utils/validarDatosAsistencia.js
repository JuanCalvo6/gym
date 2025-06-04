function validarDatosAsistencia (datos){
    const errores = []
    
    if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(datos.fecha)) 
        errores.push('Formato de fecha inválido. Debe ser HH:mm DD-MM-YYYY');

    return errores;
}

module.exports = validarDatosAsistencia;