function validarDatosAsistencia (datos){
    const errores = []

    if (!datos || typeof datos.fecha !== "string") {
        errores.push("No se proporcionó una fecha válida.");
        return errores;
    }

    if (!/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(datos.fecha)) 
        errores.push('Formato de fecha inválido. Debe ser HH:mm DD-MM-YYYY');

    return errores;
}

module.exports = validarDatosAsistencia;